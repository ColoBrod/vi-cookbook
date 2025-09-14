export enum ActionType {
  SetPreview,
  SetProgress,
  SetCompleted,
  SetError,
} 

export interface UploadSetErrorAction {
  type: ActionType.SetError;
  payload: string;
}

export interface UploadSetCompletedAction {
  type: ActionType.SetCompleted;
  payload: boolean;
}

export interface UploadSetProgressAction {
  type: ActionType.SetProgress;
  payload: number;
}

export interface UploadSetPreviewAction {
  type: ActionType.SetPreview;
  payload: string;
}

export type UploadAction = UploadSetPreviewAction 
  | UploadSetProgressAction 
  | UploadSetCompletedAction 
  | UploadSetErrorAction;

export interface UploadState {
  previewUrl: string;
  progress: number;
  completed: boolean;
  error: string;
}

export function uploadReducer(state: UploadState, action: UploadAction): UploadState {
  switch (action.type) {
    case ActionType.SetProgress: 
      return { ...state, progress: action.payload };
    case ActionType.SetPreview: 
      return { ...state, previewUrl: action.payload };
    case ActionType.SetCompleted: 
      return { ...state, completed: action.payload };
    case ActionType.SetError: 
      return { ...state, error: action.payload };
    default: 
      return state;
  }
}

export const uploadState: UploadState = {
  previewUrl: "",
  progress: 0,
  completed: true,
  error: "",
}
