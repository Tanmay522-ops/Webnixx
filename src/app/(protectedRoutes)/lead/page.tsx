import PageHeader from '@/components/ReusableComponent/PageHeader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import LeadIcon from '@/icons/LeadIcon'
import PipelineIcon from '@/icons/PipelineIcon'
import {  Webcam } from 'lucide-react'
import React from 'react'
import { leadData } from './__tests__/data'
import { Badge } from '@/components/ui/badge'

type Props = {}

const page = (props: Props) => {
    return (
        <div className="w-full flex flex-col gap-8">
            <PageHeader
                leftIcon={<Webcam className="w-3 h-3" />}
                mainIcon={<LeadIcon className="w-12 h-12" />}
                rightIcon={<PipelineIcon className="w-3 h-3" />}
                heading="The home to all your customers"
                placeholder="Search customer..."
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-sm text-muted-foreground">
                            Name
                        </TableHead>
                        <TableHead className="text-sm text-muted-foreground">
                            Email
                        </TableHead>
                        <TableHead className="text-sm text-muted-foreground">
                            Phone
                        </TableHead>
                        <TableHead className="text-right text-sm text-muted-foreground">
                            Tags
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leadData?.map((lead, idx) => (
                        <TableRow
                            key={idx}
                            className="border-0"
                        >
                            <TableCell className="font-medium">{lead?.name}</TableCell>
                            <TableCell>{lead?.email}</TableCell>
                            <TableCell>{lead?.phone}</TableCell>
                            <TableCell className="text-right">
                                {lead?.tags?.map((tag, idx) => (
                                    <Badge
                                        key={idx}
                                        variant="outline"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default page