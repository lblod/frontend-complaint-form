import AuApp from '@appuniversum/ember-appuniversum/components/au-app';
import AuButton from '@appuniversum/ember-appuniversum/components/au-button';
import AuDropdown from '@appuniversum/ember-appuniversum/components/au-dropdown';
import AuMainContainer from '@appuniversum/ember-appuniversum/components/au-main-container';
import AuMainHeader from '@appuniversum/ember-appuniversum/components/au-main-header';
import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle "Klachten"}}

  <AuApp>
    <AuMainHeader
      @brandLink="https://www.vlaanderen.be/nl"
      @homeRoute="complaints"
      @appTitle="Klachten"
    >
      {{! TODO: update this once we have integrated ember-simple-auth }}
      <AuDropdown @title="Aangemeld als ..." @alignment="right" role="menu">
        <AuButton @skin="link" @icon="logout" role="menuitem">
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
