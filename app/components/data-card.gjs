import AuHeading from '@appuniversum/ember-appuniversum/components/au-heading';
import { hash } from '@ember/helper';

<template>
  <div class="au-u-max-width-large" ...attributes>
    {{#if (has-block "title")}}
      <AuHeading
        @level={{if @headingLevel @headingLevel "3"}}
        @skin={{if @headingSkin @headingSkin "5"}}
        class="au-u-margin-bottom-tiny"
      >
        {{yield to="title"}}
      </AuHeading>
    {{/if}}
    {{#if (has-block "infotext")}}
      <p class="au-u-margin-bottom-small">
        {{yield to="infotext"}}
      </p>
    {{/if}}

    <dl class="au-o-box au-c-card au-c-card--data">
      <div class="au-c-card__content">
        {{yield (hash Grid=CardGrid Columns=CardColumns) to="card"}}
      </div>
    </dl>
  </div>
</template>

const CardGrid = <template>
  <div class="au-c-card-grid" ...attributes>
    <div class="au-o-grid au-o-grid--small">
      {{yield (component Item isGrid=true)}}
    </div>
  </div>
</template>;

const CardColumns = <template>
  <div class="au-c-card-columns" ...attributes>
    <div class="au-c-card-columns__column">
      {{yield Item to="left"}}
    </div>
    <div class="au-c-card-columns__column">
      {{yield Item to="right"}}
    </div>
  </div>
</template>;

const Item = <template>
  <div
    class="au-c-card-item
      {{if @alignTop 'au-c-card-grid-item--align-top'}}
      {{if @isGrid 'au-o-grid__item au-u-1-2@medium'}}"
    ...attributes
  >
    {{#if (has-block "label")}}
      <dt class="au-c-card-item__label au-c-card-item__label--data">
        {{yield to="label"}}
      </dt>
    {{/if}}

    {{#if (has-block "content")}}
      <dd
        class="au-c-card-item__content au-u-word-break
          {{if (not (has-block 'label')) 'au-c-card-item__content--offset'}}
          "
      >
        {{yield to="content"}}
      </dd>
    {{/if}}
  </div>
</template>;

function not(truthy) {
  return !truthy;
}
