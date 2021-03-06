import { types, flow } from "mobx-state-tree"

import { WishList } from "./WishList";

const User = types.model({
    id: types.identifier,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {})
})
.actions((self) => ({
    getSuggestions: flow(function* () {
        const response = yield window
        .fetch(`http://localhost:3001/suggestions_${self.gender}`);
        const suggestions = yield response.json();
        self.wishList.items.push( ...suggestions)
    }),
    addSuggestions(suggestions: any) {
        self.wishList.items.push( ...suggestions)
    }
}))

export const Group = types.model({
    users: types.map(User)
})