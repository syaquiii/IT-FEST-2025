import React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table"
import { getPaymentStatusStyle } from "@/shared/utils/paymentStyles";
import { TeamDetailsData } from "@/api/services/admin";


interface TeamListTableProps {
    totalAll: number;
    teamData: TeamDetailsData[] | null;
}

const TeamListTable = ({ totalAll, teamData }: TeamListTableProps) => {
    if (!teamData) {
        return <div>Loading...</div>;
    }

    if (teamData.length === 0) {
        return <div>No teams found.</div>;
    }

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
                {teamData.map((teamData) => (
                    <TableRow>
                        <TableCell className="font-medium">{teamData.team_name}</TableCell>
                        <TableCell className="font-medium">{teamData.leader_name}</TableCell>
                        <TableCell>{teamData.university}</TableCell>
                        <TableCell>
                            <span className={getPaymentStatusStyle(teamData.payment_status)}>
                                {teamData.payment_status}
                            </span>
                        </TableCell>
                        <TableCell>{teamData.competition_name}</TableCell>
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