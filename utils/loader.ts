import { ExcludeKey, ExcludeProps, Nullable } from "@utils/common";

type ResponseDataT = 'blob' | 'arraybuffer' | 'json' | 'text';

export interface RequestData {
    url: string;
    success: boolean;
    progress: number;
    resolved: Nullable<unknown>;
    metadata: ExcludeProps<RequestOptions, Function>
}

interface RequestOptions {
    mimeType?: string;
    responseType?: ResponseDataT;
    onProgressUpdate?: (progress: number, requests: RequestData[]) => void;
}

export class AssetLoader {
    requests: RequestData[] = [];
    totalProgress = 0;
    pollingTimeout?: boolean;
    resolve?: (value: RequestData[]) => void;
    onProgressUpdate?: (progress: number, requests: RequestData[]) => void;

    constructor(requests: { url: string, overrideOptions?: ExcludeKey<RequestOptions, 'onProgressUpdate'> }[], options: RequestOptions = {}) {
        this.onProgressUpdate = options.onProgressUpdate;
        delete options.onProgressUpdate;
        this.requests = requests.map(({ url, overrideOptions }) => ({
            url,
            success: false,
            progress: 0,
            resolved: null,
            metadata: {
                ...options,
                ...(overrideOptions ?? {})
            }
        }));
        for (const request of this.requests) {
            this.load(request);
        }
    }
    load(request: RequestData) {
        const xhr = new XMLHttpRequest();
        if (request.metadata.mimeType) xhr.overrideMimeType(request.metadata.mimeType);
        if (request.metadata.responseType) xhr.responseType = request.metadata.responseType;
        xhr.open("GET", request.url, true);
        xhr.onprogress = (e) => {
            if (e.lengthComputable) {
                request.progress = e.loaded / e.total;
                this.updateProgress();
            }
        };
        xhr.onload = () => {
            request.success = true;
            request.progress = 1;
            request.resolved = xhr.response;
            this.updateProgress();
            this.requestFinished();
        };
        xhr.onerror = () => {
            request.success = false;
            request.progress = 1;
            this.updateProgress();
            this.requestFinished();
        };
        xhr.send();
    }
    private requestFinished() {
        if (this.totalProgress === 1)
            this.resolve?.(this.requests);
    }
    private updateProgress() {
        if (this.pollingTimeout !== undefined) {
            return;
        }
        this.totalProgress = this.requests.reduce((acc, { progress }) => acc + progress, 0) / this.requests.length;
        this.onProgressUpdate?.(this.totalProgress, this.requests);

        setTimeout(() => {
            delete this.pollingTimeout;
            if (this.totalProgress < 1)
                this.updateProgress();
        }, 300);
    }

    await() {
        return new Promise<RequestData[]>((resolve) => {
            if (this.totalProgress === 1)
                resolve(this.requests);
            this.resolve = resolve;
        });
    }
}
