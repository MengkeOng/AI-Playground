declare interface Window {
    chrome: Chrome;
    electronAPI: electronAPI;
}

type electronAPI = {
    openUrl(url: string): void
    changeWindowMessageFilter(): void;
    getWinSize(): Promise<{
        width: number;
        height: number;
        maxChatContentHeight: number;
    }>;
    getLocalSettings(): Promise<LocalSettings>;
    setWinSize(width: number, height: number): Promise<void>;
    showSaveDialog(options: Electron.SaveDialogOptions): Promise<Electron.SaveDialogReturnValue>
    showMessageBox(options: Electron.MessageBoxOptions): Promise<number>
    showMessageBoxSync(options: Electron.MessageBoxSyncOptions): Promise<number>
    showOpenDialog(options: Electron.OpenDialogOptions): Promise<Electron.OpenDialogReturnValue>
    dragWinToMoveStart(x: number, y: number): void;
    dragWinToMove(x: number, y: number): void;
    dragWinToMoveStop(): void;
    setIgnoreMouseEvents(ignore: boolean): void;
    miniWindow(): void;
    exitApp(): void;
    saveImage(url: string): void;
    openImageWin(url: string, title: string, width: number, height: number): void;
    wakeupApiService(): void;
    screenChange(callback: (width: number, height: number) => void): void;
    webServiceExit(callback: (serviceName: string, normalExit: string) => void): void;
    existsPath(path: string): Promise<boolean>;
    getInitSetting(): Promise<SetupData>
    updateModelPaths(modelPaths: ModelPaths): Promise<ModelLists>,
    restorePathsSettings():Promise<void>,
    refreshSDModles(): Promise<string[]>,
    refreshLLMModles(): Promise<string[]>,
    refreshLora(): Promise<string[]>,
    refreshInpaintModles(): Promise<string[]>,
    openImageWithSystem(url: string): void,
    selecteImage(url: string): void,
    setFullScreen(enable: boolean): void
};

type Chrome = {
    webview: WebView;
};

type WebView = {
    hostObjects: HostProxyObjects;
    addEventListener: (event: "message", callback: (args: any) => void) => void;
    removeEventListener: (
        event: "message",
        callback: (args: any) => void
    ) => void;
};

type HostProxyObjects = {
    clientAPI: AsyncClientAPI;
    sync: SyncProxyObjects;
};

type AsyncClientAPI = {
    WebViewInvoke: (
        methodName: string,
        param?: number | boolean | string | null
    ) => Promise<string>;
};

type SyncProxyObjects = {
    clientAPI: SyncClientAPI;
};

type SyncClientAPI = {
    WebViewInvoke: (
        methodName: string,
        param?: number | boolean | string | null
    ) => string;
};

type ApiResponse = {
    code: number;
    message: string;
};

type KVObject = {
    [key: string]: any;
};

type StringKV = {
    [key: string]: string;
};

type WebSettings = {
    graphics: { name: string, index: number }[];
    schedulers: string[]
}

type GraphicsItem = {
    index: number,
    name: string
}

type ClientMessageEventArgs = {
    data: UpdateLanguageSettingsNotify;
    type: "message";
};


type UpdateLanguageSettingsNotify = {
    type: "updateLanguageSettings";
    value: LanguageSetting;
};

type LanguageSetting = {
    langName: string;
    records: Record<string, string>;
};


type DropListItem = {
    display: string;
    value: string | number;
}

type ChatItem = {
    question: string,
    answer: string,
}

type ChatRequestParams = {
    context?: Array<Chat>;
}

type RagFileItem = {
    type: number;
    filename: string;
    md5: string;
    status: number,
    path?: string | null;
}


type LLMOutCallback = LoadModelCallback | LLMOutTextCallback | DownloadModelProgressCallback | DownloadModelCompleted | ErrorOutCallback | NotEnoughDiskSpaceExceptionCallback;

type LLMOutTextCallback = {
    type: "text_out",
    value: string
    dtype: 1, 2
}

type SDOutCallback = LoadModelCallback | LoadModelcomponentsCallback | SDOutImagelCallback | SDStepEndCallback | ErrorOutCallback | NotEnoughDiskSpaceExceptionCallback;

type LoadModelCallback = {
    type: "load_model",
    event: "start" | "finish"
}

type LoadModelcomponentsCallback = {
    type: "load_model_components",
    event: "start" | "finish"
}

type SDOutImagelCallback = {
    type: "image_out",
    index: number,
    image: string,
    params: KVObject,
}

type SDStepEndCallback = {
    type: "step_end",
    index: number,
    step: number,
    total_step: number,
    image?: string,
}

type NotEnoughDiskSpaceExceptionCallback = {
    type: "error",
    err_type: "not_enough_disk_space",
    requires_space: string,
    free_space: string
}

type ErrorOutCallback = {
    type: "error",
    err_type: "runtime_error" | "download_exception" | "unknow_exception",
};

type DownloadModelProgressCallback = {
    type: "download_model_progress",
    repo_id: string;
    download_size: string,
    total_size: string,
    percent: number,
    speed: string,
}

type DownloadModelCompleted = {
    type: "download_model_completed",
    repo_id: string;
}

type ShowOpenDialogOptions = {
    filters: Array<{
        name: string,
        extensions: Array<string>
    }>,
    title?: string,
    multiSelected?: boolean,
}
type ShowOpenDialogResult = {
    canceled: boolean,
    filePaths: Array<string>
}

type ShowSaveDialogOptions = {
    filters: Array<{
        name: string,
        extensions: Array<string>
    }>,
    title?: string,
    defaultPath?: string;
}

type ShowSaveDialogResult = {
    canceled: boolean,
    filePath: string;
}

type RandomNumberSetting = {
    min: nubmer;
    max: number;
    scale: number;
    default: number;
    value: number;
}

type ResolutionSettings = {
    width: NumberRange;
    height: NumberRange;
    preset: Size[]
}

type Size = {
    width: number;
    height: number;
}

type NumberRange = {
    min: number;
    max: number;
}

type DownloadFailedParams = { type: "error" | "cancelConfrim" | "cancelDownload" | "conflict", error?: any }

type CheckModelExistParam = {
    repo_id: string;
    type: number
}

type DownloadModelParam = CheckModelExistParam

type DownloadModelRender = { size: string } & CheckModelExistParam

type CheckModelExistResult = {
    exist: boolean
} & CheckModelExistParam

type CheckModelSizeResult = {
    size: string
} & CheckModelExistParam

type SDGenerateState = "no_start" | "input_image" | "load_model" | "load_model_components" | "generating" | "image_out" | "error"