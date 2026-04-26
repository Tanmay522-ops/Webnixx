import { getAllAssistants } from '@/actions/vapi'
import React from 'react'
import AiAgentSidebar from './_components/AiAgentSidebar'
import ModelSection from './_components/ModelSection '

type Props = {}

const page = async (props: Props) => {
    const allAgents = await getAllAssistants()

    return (
        <div className="w-full flex h-[80vh] text-primary border border-border rounded-se-xl">
            <AiAgentSidebar aiAgents={allAgents?.data || []} />
            <div className="flex-1 flex flex-col">
                 <ModelSection /> 
                </div>
        </div>
    )
}

export default page