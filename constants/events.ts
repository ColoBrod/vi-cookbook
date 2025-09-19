export const AppEvent = {
  Collection: {
    ShowCreateForm: 'APP_EVENT_COLLECTION_SHOW_CREATE_FORM',
    HideCreateForm: 'APP_EVENT_COLLECTION_HIDE_CREATE_FORM',
    ShowAddToCollectionForm: 'APP_EVENT_COLLECTION_SHOW_ADD_TO_COLLECTION_FORM',
    HideAddToCollectionForm: 'APP_EVENT_COLLECTION_HIDE_ADD_TO_COLLECTION_FORM',
  },
  SideMenu: {
    Open: 'APP_EVENT_SIDE_MENU_OPEN',
    Close: 'APP_EVENT_SIDE_MENU_CLOSE',
    Toggle: 'APP_EVENT_SIDE_MENU_TOGGLE',
  },
} as const;

export interface EventPayloadShowAddToCollectionForm {
  recipeId: number;
} 
