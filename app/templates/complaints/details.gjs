import AuHeading from '@appuniversum/ember-appuniversum/components/au-heading';
import AuLink from '@appuniversum/ember-appuniversum/components/au-link';
import AuLoader from '@appuniversum/ember-appuniversum/components/au-loader';
import AuLinkExternal from '@appuniversum/ember-appuniversum/components/au-link-external';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import formatDatetime from 'frontend-complaint-form/helpers/format-datetime';
import formatTel from 'frontend-complaint-form/helpers/format-tel';
import { Await, getPromiseState } from '@warp-drive/ember';
import { pageTitle } from 'ember-page-title';
import DataCard from 'frontend-complaint-form/components/data-card';

export default class ComplaintDetails extends Component {
  get complaint() {
    return {
      name: 'foo',
      telephone: '+12345',
      email: 'foo@bar.be',
    };
  }

  @cached
  get complaintPromise() {
    return this.store.findRecord('complaint-form', this.args.model.id, {
      include: 'attachments',
      page: {
        number: this.args.controller.page,
        size: this.args.controller.size,
      },
      sort: this.args.controller.sort,
    });
  }

  <template>
    {{pageTitle "Details"}}

    <div class="au-o-region">
      <div class="au-o-layout">
        <div class="au-o-flow">
          <AuHeading class="au-u-margin-bottom-large">
            Klachtdetails
          </AuHeading>

          <Await @promise={{@model.complaintPromise}}>
            <:pending>
              <AuLoader>Aan het laden</AuLoader>
            </:pending>
            <:success as |complaint|>
              <DataCard>
                <:title>
                  TODO
                </:title>
                <:card as |Card|>
                  <Card.Grid as |Item|>
                    <Item>
                      <:label>Ingezonden door</:label>
                      <:content>
                        {{complaint.name}}
                      </:content>
                    </Item>
                    <Item>
                      <:label>Contactpersoon</:label>
                      <:content>
                        {{complaint.contactPersonName}}
                      </:content>
                    </Item>
                    <Item>
                      <:label>Ingezonden op</:label>
                      <:content>
                        {{formatDatetime complaint.created}}
                      </:content>
                    </Item>
                    <Item>
                      <:label>Telefoonnummer</:label>
                      <:content>
                        {{#if complaint.telephone}}
                          <AuLinkExternal href="tel:{{complaint.telephone}}">
                            {{formatTel complaint.telephone}}
                          </AuLinkExternal>
                        {{else}}-{{/if}}
                      </:content>
                    </Item>
                    <Item>
                      <:label>E-mailadres</:label>
                      <:content>
                        <AuLinkExternal href="mailto:{{complaint.email}}">
                          {{complaint.email}}
                        </AuLinkExternal>
                      </:content>
                    </Item>
                    <Item>
                      <:label>Adres</:label>
                      <:content>
                        {{complaint.street}} {{complaint.houseNumber}}{{complaint.addressComplement}}<br>
                        {{complaint.postalCode}} {{complaint.locality}}
                      </:content>
                    </Item>
                    <Item>
                      <:label>Bijlagen</:label>
                      <:content>
                        {{#if (hasAttachments complaint.attachments)}}
                          {{#each complaint.attachments as |file|}}
                            {{file.filename}}
                          {{/each}}
                        {{/if}}
                      </:content>
                    </Item>
                  </Card.Grid>
                </:card>
              </DataCard>
            </:success>
          </Await>
        </div>
      </div>
    </div>
  </template>
}

function hasAttachments(attachments) {
  return attachments.length > 0;
}
