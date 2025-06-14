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

const getDisplayValue = (value: string | null | undefined): string => {
    if (!value || value.trim() === '') return 'Empty Data';
    return value;
};

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
                {teamData.map((team) => (
                    <TableRow key={team.team_id}>
                        <TableCell className="font-medium">
                            {getDisplayValue(team.team_name)}
                        </TableCell>
                        <TableCell className="font-medium">
                            {getDisplayValue(team.leader_name)}
                        </TableCell>
                        <TableCell>
                            {getDisplayValue(team.university)}
                        </TableCell>
                        <TableCell>
                            <span className={getPaymentStatusStyle(team.payment_status)}>
                                {getDisplayValue(team.payment_status)}
                            </span>
                        </TableCell>
                        <TableCell>
                            {getDisplayValue(team.competition_name)}
                        </TableCell>
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