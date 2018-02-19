import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { List, Icon } from '../../../../jdl/components/index.js';

import FlowStep from '../../flow2/FlowStep';


function OrgRenderer(props) {
    const { listItem } = props;
    const { name, avatar } = listItem;

    return (
        <div className="org-list-item">
            { avatar && <img className="avatar" width="30" height="30" src={`${avatar}&s=50`} /> }
            { !avatar && <Icon className="avatar" icon="ActionGroupWork" size={30} /> }
            <span>{name}</span>
        </div>
    );
}

OrgRenderer.propTypes = {
    listItem: PropTypes.object,
};


@observer
export default class GithubOrgListStep extends React.Component {

    selectOrganization(org) {
        this.props.flowManager.selectOrganization(org);
    }

    render() {
        const { flowManager } = this.props;
        const title = 'Which organization does the repository belong to?';
        const disabled = flowManager.stepsDisabled;

        return (
            <FlowStep {...this.props} className="github-org-list-step layout-large" title={title} disabled={disabled}>
                <List
                  className="org-list"
                  data={flowManager.organizations}
                  onItemSelect={(idx, org) => this.selectOrganization(org)}
                  defaultContainerClass={false}
                >
                    <OrgRenderer />
                </List>
            </FlowStep>
        );
    }
}

GithubOrgListStep.propTypes = {
    flowManager: PropTypes.object,
};
