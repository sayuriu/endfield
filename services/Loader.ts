export class Loader {
    private static _instance: Loader;
    private _loaded = false;
    private _progress = 0;
    private constructor() {
        Object.defineProperty(this, 'progress', {
            get: () => {
                return this._progress;
            },
            set: (value) => {
                this._progress = value;
                if (this._progress >= 1) {
                    this._loaded = true;
                }
                if (this.listeners.length)
                    this.listeners.forEach(async (listener) => listener(this._progress));
            }
        });
    }
    private listeners: Array<(progress: number) => void> = [];
    addListener(listener: (progress: number) => void) {
        this.listeners.push(listener);
    }
    update(delta: number) {
        if (this._loaded) {
            return;
        }
        this._progress += delta;
        if (this.listeners.length)
            this.listeners.forEach(async (listener) => listener(this._progress));
    }
    reset() {
        this._loaded = false;
        this._progress = 0;
    }
    get loaded() {
        return this._loaded;
    }
    get progressPercent() {
        return this._progress * 100;
    }
    static get instance() {
        if (!Loader._instance) {
            Loader._instance = new Loader();
        }
        return Loader._instance;
    }
}

Loader.instance;
