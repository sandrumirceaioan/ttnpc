import { Injectable, PLATFORM_ID, Inject, TransferState, makeStateKey } from '@angular/core';

import { isPlatformServer } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DataStateService {

    private isServer = false;

    constructor(
        private tstate: TransferState,
        @Inject(PLATFORM_ID) platformId: object,
    ) {
        this.isServer = isPlatformServer(platformId);
    }

    getDynamicStateKey(key: any, defaultValue: any = null) {
        if (this.tstate.hasKey(key)) {
            return this.tstate.get(key, defaultValue);
        } else {
            return defaultValue;
        }
    }

    setDynamicStateKey(key: any, data: any) {
        const NEW_KEY = makeStateKey(key)
        this.tstate.set(NEW_KEY, data);
    }

}