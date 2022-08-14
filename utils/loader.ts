import { Nullable } from "@utils/common";

type ResponseDataT = 'blob' | 'arraybuffer' | 'json' | 'text';

export interface RequestData {
    url: string;
    success: boolean;
    progress: number;
    resolved: Nullable<unknown>;
}

interface RequestOptions {
    mimeType?: string;
    responseType?: ResponseDataT;
    onProgressUpdate?: (progress: number) => void;
}

export class AssetLoader {
    requests: RequestData[] = [];
    totalProgress = 0;
    pollingTimeout?: boolean;
    resolve?: (value: RequestData[]) => void;

    constructor(readonly urls: string[], private options: RequestOptions = {}) {
        this.requests = urls.map(url => ({ url, success: false, progress: 0, resolved: null }));
        for (const request of this.requests) {
            this.load(request);
        }
    }
    load(request: RequestData) {
        const xhr = new XMLHttpRequest();
        if (this.options.mimeType) xhr.overrideMimeType(this.options.mimeType);
        if (this.options.responseType) xhr.responseType = this.options.responseType;
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
        this.options.onProgressUpdate?.(this.totalProgress);

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
