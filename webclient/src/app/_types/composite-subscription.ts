import { Subscription } from 'rxjs';

export class CompositeSubscription {
    private subscriptions: Array<Subscription> = [];

    add(...subscriptions: Array<Subscription>): void {
        this.subscriptions.push(...subscriptions);
    }

    unsubscribe(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
