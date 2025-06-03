import AuDataTable from '@appuniversum/ember-appuniversum/components/au-data-table';
import AuDataTableThSortable from '@appuniversum/ember-appuniversum/components/au-data-table/th-sortable';
import AuHeading from '@appuniversum/ember-appuniversum/components/au-heading';
import AuLink from '@appuniversum/ember-appuniversum/components/au-link';
import AuLinkExternal from '@appuniversum/ember-appuniversum/components/au-link-external';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import { getPromiseState } from '@warp-drive/ember';
import formatDatetime from 'frontend-complaint-form/helpers/format-datetime';
import formatTel from 'frontend-complaint-form/helpers/format-tel';

export default class ComplaintsIndex extends Component {
  @service store;

  @cached
  get complaintsPromiseState() {
    const promise = this.store.query('complaint-form', {
      include: 'attachments',
      page: {
        number: this.args.controller.page,
        size: this.args.controller.size,
      },
      sort: this.args.controller.sort,
    });

    return getPromiseState(promise);
  }

  get isLoading() {
    return this.complaintsPromiseState.isPending;
  }

  get isError() {
    return this.complaintsPromiseState.isError;
  }

  get complaints() {
    return this.isLoading || this.isError
      ? []
      : this.complaintsPromiseState.result;
  }

  <template>
    <div class="au-o-region">
      <div class="au-o-layout">
        <AuHeading class="au-u-margin-bottom-large">Klachten</AuHeading>
        <AuDataTable
          @content={{this.complaints}}
          @page={{@controller.page}}
          @noDataMessage="Er werden nog geen klachten ingediend"
          @sort={{@controller.sort}}
          @isLoading={{this.isLoading}}
          @size={{@controller.size}}
          as |t|
        >
          <t.content as |c|>
            <c.header>
              <AuDataTableThSortable
                @field=":no-case:name"
                @currentSorting={{@controller.sort}}
                @label="Ingezonden door"
                @class="data-table__header-title"
              />
              <AuDataTableThSortable
                @field="telephone"
                @currentSorting={{@controller.sort}}
                @label="Telefoonnummer"
                @class="data-table__header-title"
              />
              <AuDataTableThSortable
                @field="email"
                @currentSorting={{@controller.sort}}
                @label="E-mailadres"
                @class="data-table__header-title"
              />
              <AuDataTableThSortable
                @field="created"
                @currentSorting={{@controller.sort}}
                @label="Ingezonden op"
                @class="data-table__header-title"
              />
              <th>
                Aantal bijlagen
              </th>
              <th>{{! Details page link }}</th>
            </c.header>
            <c.body as |complaint|>
              <td>
                <div class="u-truncate">
                  {{complaint.name}}
                </div>
              </td>
              <td>
                {{#if complaint.telephone}}
                  {{#let (formatTel complaint.telephone) as |tel|}}
                    {{#if tel.length}}
                      <AuLinkExternal href="tel:{{complaint.telephone}}">
                        {{formatTel complaint.telephone}}
                      </AuLinkExternal>
                    {{else~}}
                      -
                    {{~/if}}
                  {{/let}}
                {{else}}-{{/if}}
              </td>
              <td>
                <AuLinkExternal href="mailto:{{complaint.email}}">
                  {{complaint.email}}
                </AuLinkExternal>
              </td>
              <td>{{formatDatetime complaint.created}}</td>
              <td>{{complaint.attachments.length}}</td>
              <td>
                <AuLink
                  @route="complaints.details"
                  @model={{complaint.id}}
                  @icon="eye"
                >
                  Details
                </AuLink>
              </td>
            </c.body>
          </t.content>
        </AuDataTable>
      </div>
    </div>
  </template>
}
