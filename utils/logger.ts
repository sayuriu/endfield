type LogLevel = "info" | "warn" | "error" | "debug";

interface LogOptions {
    bypassDevCheck?: boolean;
    trace?: boolean;
    noVerbose?: boolean;
    forceTrace?: boolean;
}

interface LogPayload {
    data: any[];
    level?: LogLevel;
    options?: LogOptions;
}

export class Logger {
    static readonly mode = process.env.NODE_ENV ?? "development";
    private static _instance: Logger;
    private constructor() { }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    private buildLevelHeader(level: LogLevel) {
        return [`%c[${level.toUpperCase()}]`, `background: ${this.getLevelColor(level)}; color: #000; font-weight: bold`];
    }
    private get commonTextProps() {
        return "";
    }
    private toStyleString(...style: string[]) {
        return style.join(";");
    }
    private getLevelColor(level: LogLevel) {
        switch(level) {
            case "info": return "#3ba4fa";
            case "warn": return "#ffa71f";
            case "error": return "#fa3b3b";
            case "debug": return "#3bfa5b";
        }
    }
    _log(config: LogPayload) {
        let { level = "info", options = {}, data } = config;
        let
            grouped = false,
            trace = options.trace ?? false;
        if (!data.length) return;

        let [headerText, headerStyle] = this.buildLevelHeader(level);
        headerStyle = this.toStyleString(headerStyle, this.commonTextProps);
        const subHeaderStyle = this.toStyleString(this.commonTextProps, headerStyle, "background: #646464; color: #fff");
        let message = {
            style: this.commonTextProps,
            text: typeof data[0] === "string" ? data.shift() : ""
        };
        switch(config.level) {
            case "debug": {
                if (Logger.mode !== "development" && !options.bypassDevCheck)
                    return;
                if (options.noVerbose) break;
                grouped = true;
                break;
            }
            case "warn": {
                if (Logger.mode === "development" || !options.bypassDevCheck)
                {
                    grouped = true;
                    trace = true;
                }
                break;
            }
            case "error": {
                trace = true;
                grouped = true;
            }
        }
        if (options.forceTrace) trace = true;
        console
            [grouped ? "group" : "log"]
            (`${headerText}%c ${message.text}\n`, headerStyle, message.style, ...(grouped ? [] : data));
        if (grouped && message.text.length)
            console.log(`%c[MESSAGE]%c ${message.text}\n`, headerStyle, message.style);
        if (trace)
        {
            const traceData = new Error(message.text).stack?.split("\n");
            const trace = traceData?.slice(3) ?? ["(unknown)"];
            console.group(`%c[TRACE]`, subHeaderStyle);
            for (let i = 0, v = "00"; i < trace.length; i++, v = i.toString().padStart(2, "0"))
                console.log(
                    `%c${v[0]}%c${v[1]}%c`,
                    `color: #${i < 10 ? "3e3e3e" : "fff"}`,
                    "color: #fff",
                    "",
                    trace[i].substring(trace[i].indexOf("at") + 2).trim()
                );
            console.groupEnd();
        }
        if (grouped && data.length)
        {
            console.group(`%c[DATA]`, subHeaderStyle);
            for (let i = 0; i < data.length; i++)
                console.log(`%cArgument %c#${i}`, "color: #3e3e3e", "", data[i]);
            console.groupEnd();
        }
        if (grouped)
            console.groupEnd();
    }
    info(options?: LogOptions, ...data: unknown[]) {
        this._log({ data, level: "info", options });
    }
    warn(options?: LogOptions, ...data: unknown[]) {
        this._log({ data, level: "warn", options });
    }
    error(options?: LogOptions, ...data: unknown[]) {
        this._log({ data, level: "error", options });
    }
    debug(options?: LogOptions, ...data: unknown[]) {
        this._log({ data, level: "debug", options });
    }
}
