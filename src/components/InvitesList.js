import React from "react";

export const InvitesList = ({ pendingInvites }) => {
    const renderInvites = (invites) => {
        return (
            <ol>
                {invites.map((invite) => (
                    <li key={invite.campaignId}>
                        {`${invite.gm} invites you to participate in "${
                            invite.name
                        }" campaign! | ${invite.date.toDate()}`}
                        {/* here should be buttons to accept/decline invitation*/}
                    </li>
                ))}
            </ol>
        );
    };

    return (
        <div>
            <h2>Pending campaign invites:</h2>
            {renderInvites(pendingInvites)}
        </div>
    );
};
