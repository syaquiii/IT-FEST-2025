import React from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table"
import { teamList } from "@/feature/_admin/teamlist/data/useTeamData";
import { getPaymentStatusStyle } from "@/shared/utils/paymentStyles";

interface TotalTeamsCardProps {
    totalAll: number;
}

const TeamListTable = ({ totalAll }: TotalTeamsCardProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow className="table-custom">
                    <TableHead>Team Name</TableHead>
                    <TableHead>Leader Name</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Competition</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {teamList.map((teamList) => (
                    <TableRow key={teamList.id}>
                        <TableCell className="font-medium">{teamList.team_name}</TableCell>
                        <TableCell className="font-medium">{teamList.leader_name}</TableCell>
                        <TableCell>{teamList.university}</TableCell>
                        <TableCell>
                            <span className={getPaymentStatusStyle(teamList.payment_status)}>
                                {teamList.payment_status}
                            </span>
                        </TableCell>
                        <TableCell>{teamList.competition_name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total Team</TableCell>
                    <TableCell className="text-right">{totalAll}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default TeamListTable;