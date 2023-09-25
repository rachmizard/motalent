/**
 * @deprecated use locator instead
 */
export const DI_TYPES = {
  APP_CONFIG: Symbol('APP_CONFIG'),
  DATA_SOURCE: Symbol('DATA_SOURCE'),
  ACCOUNT_REPO: Symbol('ACCOUNT_REPOSITORY'),
  CLIENT_REPO: Symbol('CLIENT_REPOSITORY'),
  CLIENT_SEARCH_PREFERENCE_REPO: Symbol('CLIENT_SEARCH_PREFERENCE_REPOSITORY'),
  CATEGORY_REPO: Symbol('CATEGORY_REPOSITORY'),
};

export const locator = {
  appConfigService: Symbol('APP_CONFIG'),
  dataSource: Symbol('DATA_SOURCE'),
  accountRepository: Symbol('ACCOUNT_REPOSITORY'),
  clientRepository: Symbol('CLIENT_REPOSITORY'),
  clientSearchPreferenceRepository: Symbol(
    'CLIENT_SEARCH_PREFERENCE_REPOSITORY',
  ),
  clientJobPostingRepository: Symbol('CLIENT_JOB_POSTING_REPOSITORY'),
  categoryRepository: Symbol('CATEGORY_REPOSITORY'),
};
