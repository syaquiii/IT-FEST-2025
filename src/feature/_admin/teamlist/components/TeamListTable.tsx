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
import Link from "next/link";


interface TeamListTableProps {
    totalAll: number;
    teamData: TeamDetailsData[] | null;
}

const getDisplayValue = (value: string | null | undefined): string => {
    if (!value || value.trim() === '') return 'Empty Data';
    return value;
};

const isValidTeam = (team: TeamDetailsData): boolean => {
    return Boolean(
        team.team_name?.trim() &&
        team.leader_name?.trim() &&
        team.university?.trim()
    );
};

const TeamListTable = ({ totalAll, teamData }: TeamListTableProps) => {
    if (!teamData) {
        return <div>Loading...</div>;
    }

    if (teamData.length === 0) {
        return <div>No teams found.</div>;
    }

    const validTeams = teamData.filter(isValidTeam);

    return (
        <Table className="font-changa">
            <TableHeader>
                <TableRow className="table-custom">
                    <TableHead>Team Name</TableHead>
                    <TableHead>Leader Name</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Competition</TableHead>
                    <TableHead>Edit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {validTeams.map((team) => (
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
                        <TableCell>
                            <Link
                                href={`team-list/${team.team_id}`}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Edit
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Total Team</TableCell>
                    <TableCell className="text-right">{totalAll}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default TeamListTable;