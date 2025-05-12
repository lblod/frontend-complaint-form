import AuHeading from '@appuniversum/ember-appuniversum/components/au-heading';
import AuFileCard from '@appuniversum/ember-appuniversum/components/au-file-card';
import AuLink from '@appuniversum/ember-appuniversum/components/au-link';
import AuLoader from '@appuniversum/ember-appuniversum/components/au-loader';
import AuLinkExternal from '@appuniversum/ember-appuniversum/components/au-link-external';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import formatDatetime from 'frontend-complaint-form/helpers/format-datetime';
import formatTel from 'frontend-complaint-form/helpers/format-tel';
import { Await } from '@warp-drive/ember';
import { pageTitle } from 'ember-page-title';
import DataCard from 'frontend-complaint-form/components/data-card';

export default class ComplaintDetails extends Component {
  @service store;
  @service router;

  @cached
  get complaintPromise() {
    const complaintId = this.router.currentRoute.params.id;
    return this.store.findRecord(
      'complaint-form',
      complaintId,
      {
        include: 'attachments',
      },
      { reload: true },
    );
  }

  <template>
    {{pageTitle "Klachtdetails"}}

    <div class="au-o-region">
      <div class="au-o-layout">
        <div class="au-o-flow">
          <AuHeading class="">
            Klachtdetails
          </AuHeading>

          <AuLink @route="complaints" @icon="arrow-left">
            Terug naar het overzicht
          </AuLink>

          <Await @promise={{this.complaintPromise}}>
            {{!-- <Await @promise={{@model.complaintPromise}}> --}}
            <:pending>
              <AuLoader>Aan het laden</AuLoader>
            </:pending>
            <:success as |complaint|>
              <DataCard>
                <:title>Contactgegevens indiener</:title>
                <:card as |Card|>
                  <Card.Grid as |Item|>
                    <Item>
                      <:label>Ingezonden door</:label>
                      <:content>
                        {{complaint.name}}
                      </:content>
                    </Item>
                    <Item>
                      <:label>Ingezonden op</:label>
                      <:content>
                        {{formatDatetime complaint.created}}
                      </:content>
                    </Item>
                    <Item>
                      <:label>Contactpersoon</:label>
                      <:content>
                        {{#if complaint.contactPersonName}}
                          {{complaint.contactPersonName}}
                        {{else}}
                          -
                        {{/if}}
                      </:content>
                    </Item>
                  </Card.Grid>
                  <Card.Grid as |Item|>
                    <Item>
                      <:label>Telefoonnummer</:label>
                      <:content>
                        {{#if complaint.telephone}}
                          <AuLinkExternal href="tel:{{complaint.telephone}}">
                            {{formatTel complaint.telephone}}
                          </AuLinkExternal>
                        {{else}}
                          -
                        {{/if}}
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
                        {{complaint.street}}
                        {{complaint.houseNumber}}{{complaint.addressComplement}}
                        <br />
                        {{complaint.postalCode}}
                        {{complaint.locality}}
                      </:content>
                    </Item>
                  </Card.Grid>
                </:card>
              </DataCard>
              <DataCard>
                <:title>Klacht</:title>
                <:card as |Card|>
                  <Card.Grid as |Item|>
                    <Item>
                      <:label>Omschrijving</:label>
                      <:content>
                        <p class="u-whitespace-pre-line">
                          {{~complaint.content~}}
                        </p>
                      </:content>
                    </Item>
                    <Item>
                      <:label>Bijlagen</:label>
                      <:content>
                        {{#if (hasAttachments complaint.attachments)}}
                          <ol
                            class="au-u-margin-top-tiny au-o-flow au-o-flow--tiny"
                          >
                            {{#each complaint.attachments as |file|}}
                              <li>
                                <AuFileCard
                                  @filename={{file.filename}}
                                  @fileSize={{file.humanReadableSize}}
                                  @downloadLink={{downloadLink file}}
                                />
                              </li>
                            {{/each}}
                          </ol>
                        {{else}}
                          -
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

function downloadLink(file) {
  return `/files-download/${file.id}/download?name=${file.filename}`;
}
