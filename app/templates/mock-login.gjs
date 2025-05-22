import AuAlert from '@appuniversum/ember-appuniversum/components/au-alert';
import AuButton from '@appuniversum/ember-appuniversum/components/au-button';
import AuContentHeader from '@appuniversum/ember-appuniversum/components/au-content-header';
import AuDataTableNumberPagination from '@appuniversum/ember-appuniversum/components/au-data-table/number-pagination';
import AuHeading from '@appuniversum/ember-appuniversum/components/au-heading';
import AuLoader from '@appuniversum/ember-appuniversum/components/au-loader';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import MockLogin from '@lblod/ember-mock-login/components/mock-login';
import { Await } from '@warp-drive/ember';
import { pageTitle } from 'ember-page-title';

export default class MockLoginPage extends Component {
  @service store;

  @cached
  get usersPromise() {
    return this.store.query('account', {
      include: 'user.groups',
      filter: { provider: 'https://github.com/lblod/mock-login-service' },
      sort: 'user.first-name',
      page: {
        number: this.args.controller.page,
        size: this.args.controller.size,
      },
    });
  }

  <template>
    {{pageTitle "Kies een gebruiker"}}

    <AuContentHeader
      @titlePartOne="Vlaanderen"
      @titlePartTwo="is lokaal bestuur"
      @pictureSize="large"
    >
      <img
        sizes="50vw"
        src="/assets/images/header-1600.jpg"
        srcset="/assets/images/header-320.jpg 320w, /assets/images/header-1024.jpg 1024w, /assets/images/header-1600.jpg 1600w"
        alt=""
      />
    </AuContentHeader>

    <div class="au-o-region-large">
      <div class="au-o-layout">
        <AuHeading @skin="4" class="au-u-margin-bottom-small">
          Kies een gebruiker
        </AuHeading>

        <MockLogin as |login|>
          <Await @promise={{this.usersPromise}}>
            <:pending>
              <AuLoader class="au-o-region">
                Accounts aan het laden
              </AuLoader>
            </:pending>

            <:error>
              <AuAlert
                @icon="alert-triangle"
                @title="Er ging iets fout"
                @skin="error"
              />
            </:error>

            <:success as |accounts|>
              {{#if login.errorMessage}}
                <AuAlert
                  @icon="alert-triangle"
                  @title={{login.errorMessage}}
                  @skin="warning"
                />
              {{/if}}
              {{#if accounts.length}}
                <ul class="au-o-flow au-o-flow--small au-u-margin-bottom-small">
                  {{#each accounts as |account|}}
                    <li>
                      <AuButton
                        {{!TODO: this should be a tertiary button, but Appuniversum doesn't support that yet}}
                        @skin="secondary"
                        class="mock-account-button au-u-padding-small au-u-1-1 au-u-text-left"
                        {{on
                          "click"
                          (fn
                            login.login account.id (firstGroupId account.user)
                          )
                        }}
                      >
                        {{account.user.firstName}}
                        {{account.user.familyName}}
                      </AuButton>
                    </li>
                  {{/each}}
                </ul>
              {{/if}}
              <AuDataTableNumberPagination
                @page={{@controller.page}}
                @size={{@controller.size}}
                @nbOfItems={{accounts.length}}
                @total={{accounts.meta.count}}
                @links={{accounts.meta.pagination}}
              />
            </:success>
          </Await>
        </MockLogin>
      </div>
    </div>
  </template>
}

// Users can technically have multiple groups, but for mock users we always use the first one.
function firstGroupId(user) {
  return user.groups?.at(0)?.id;
}
