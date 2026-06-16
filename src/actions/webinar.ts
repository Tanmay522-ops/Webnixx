'use server'

import { WebinarFormState } from "@/store/useWebinarStore"
import { onAuthenticateUser } from "./auth"
import { prismaClient } from "@/lib/prismaClient"
import { CtaTypeEnum, WebinarStatusEnum } from "@prisma/client"
import { revalidatePath } from "next/cache"





export const createWebinar = async (formData: WebinarFormState) => {
    try {
        const user = await onAuthenticateUser()
        if (!user.user) {
            return { status: 401, message: "Unauthorized" }
        }

        // Check user have subscription or not
        if(!user.user.subscription){
            return{ status: 402, message: "Subscription required"}
        }

        const presenterId = user.user.id
        console.log("Form Data", formData, presenterId)

        if (!formData.basicInfo.webinarName) {
            return { status: 404, message: 'Webinar name is required' }
        }

        if (!formData.basicInfo.date) {
            return { status: 404, message: 'Webinar date is required' }
        }

        if (!formData.basicInfo.time) {
            return { status: 404, message: 'Webinar time is required' }
        }

        const combinedDateTime = new Date(formData.basicInfo.date)

        const now = new Date()

        if (combinedDateTime < now) {
            return {
                status: 400,
                message: "Webinar date and time cannot be in past "
            }
        }

        const webinar = await prismaClient.webinar.create({
            data: {
                title: formData.basicInfo.webinarName,
                description: formData.basicInfo.description || '',
                startTime: combinedDateTime,
                tags: formData.cta.tags || [],
                ctaLabel: formData.cta.ctaLabel,
                ctaType: formData.cta.ctaType as CtaTypeEnum,
                aiAgentId: formData.cta.aiAgent || null,
                priceId: formData.cta.priceId || null,
                lockChat: formData.additionalInfo.lockChat || false,
                couponCode: formData.additionalInfo.couponEnabled
                    ? formData.additionalInfo.couponCode
                    : null,
                couponEnabled: formData.additionalInfo.couponEnabled || false,
                presenterId: presenterId,
            },
        })
        revalidatePath("/")

        return {
            status: 200,
            message: "Webinar Created Successfully",
            webinarId: webinar.id,
            webinarLink: `/webinar/${webinar.id}`
        }

    } catch (error) {
        console.log("Error creating webinar:", error)
        return {
            status: 500,
            message: "Failed to create webinar. Please try again"
        }

    }

}

//  todo update frontend to pass webinar status
export const getWebinarByPresenterId = async (
    presenterId: string,
    webinarStatus?: string
)  => {
    try {
        let statusFilter: WebinarStatusEnum | undefined

        switch (webinarStatus) {
            case 'upcoming':
                statusFilter = WebinarStatusEnum.SCHEDULED
                break
            case 'ended':
                statusFilter = WebinarStatusEnum.ENDED
                break
            default:
                statusFilter = undefined
        }

        const webinars = await prismaClient.webinar.findMany({
            where: { presenterId, webinarStatus: statusFilter },
            include: {
                presenter: {
                    select: {
                        name: true,
                        stripeConnectId: true,
                        id: true,
                    }
                }
            }

        })
        return webinars
    } catch (error) {
        console.error("Error getting webinars:", error)
        return []
    }

}



export const getWebinarById = async (webinarId: string) => {
    try {
        const webinar = await prismaClient.webinar.findUnique({
            where: { id: webinarId },
            include: {
                presenter: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                        stripeConnectId: true,
                    },
                },
            },
        })

        return webinar
    } catch (error) {
        console.error('Error fetching webinar:', error)
        throw new Error('Failed to fetch webinar')
    }
}



export const changeWebinarStatus = async (
    webinarId: string,
    status: WebinarStatusEnum,
) => {
    try {
        const webinar = await prismaClient.webinar.update({
            where: {
                id: webinarId,
            },
            data: {
                webinarStatus: status,
            },
        });

        return {
            status: 200,
            success: true,
            message: "Webinar status updated successfully",
            data: webinar,
        };
    } catch (error) {
        console.error("Error updating webinar status:", error);
        return {
            status: 500,
            success: false,
            message: "Failed to update webinar status. Please try again.",
        };
    }
};