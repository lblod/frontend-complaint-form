import AuApp from '@appuniversum/ember-appuniversum/components/au-app';
import AuButton from '@appuniversum/ember-appuniversum/components/au-button';
import AuDropdown from '@appuniversum/ember-appuniversum/components/au-dropdown';
import AuMainContainer from '@appuniversum/ember-appuniversum/components/au-main-container';
import AuMainHeader from '@appuniversum/ember-appuniversum/components/au-main-header';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class Complaints extends Component {
  @service currentSession;
  @service session;

  logout = () => {
    this.session.invalidate();
  };

  <template>
    <AuApp>
      <AuMainHeader
        @brandLink="https://www.vlaanderen.be/nl"
        @homeRoute="complaints"
        @appTitle="Klachten"
      >
        <AuDropdown
          @title={{fullName this.currentSession.user}}
          @alignment="right"
          role="menu"
        >
          <AuButton
            @skin="link"
            @icon="logout"
            role="menuitem"
            {{on "click" this.logout}}
          >
            Afmelden
          </AuButton>
        </AuDropdown>
      </AuMainHeader>
      <AuMainContainer as |m|>
        <m.content @scroll={{true}}>
          {{outlet}}
        </m.content>
      </AuMainContainer>
    </AuApp>
  </template>
}

function fullName(user) {
  return user.firstName + ' ' + user.familyName;
}
