import { createSlice } from "@reduxjs/toolkit";
interface StateInterface {
    userName: string | null;
    email: null;
    friendRequests: any[];
    friends: any[];
    membersForGroups: any[];
    Groups: any[];
}
const initialState: StateInterface = {
    userName: null,
    email: null,
    friendRequests: [],
    friends: [],
    membersForGroups: [],
    Groups: [],
};
const userInformation = createSlice({
    name: "current_user",
    initialState,
    reducers: {
        setCredentials: (
            state: StateInterface,
            action: { payload: Pick<StateInterface, "email" | "userName"> },
        ) => {
            const { userName, email } = action.payload;
            state.userName = userName;
            state.email = email;
        },
        setFriendRequests: (state, action) => {
            state.friendRequests = new Array();
            state.friendRequests = action.payload;
        },
        logOut: (state) => {
            state.userName = null;
            state.email = null;
            state.friendRequests = new Array();
            state.friends = new Array();
        },
        removeFriendRequest: (state, action) => {
            const id = action.payload;
            state.friendRequests = state.friendRequests.filter(
                (element: any) => element.id !== id,
            );
        },
        addFriends: (state, action) => {
            const data = action.payload;
            try {
                state.friends = [...state.friends, ...data];
            } catch (e) {
                console.log("=>", e);
            }
        },
        addMemberInGroup: (state, action) => {
            const flag = state.membersForGroups.some(
                (element) => element.id === action.payload.id,
            );
            if (!flag) {
                state.membersForGroups.push(action.payload);
            }
        },
        removeMemberFromGroup: (state, action) => {
            state.membersForGroups = state.membersForGroups.filter(
                (element) => element.id !== action.payload.id,
            );
        },
        emptyMembersFromGroup: (state) => {
            state.membersForGroups = [];
        },
        setGroups: (state, action) => {
            state.Groups = action.payload;
        },
    },
});

export const {
    setCredentials,
    logOut,
    setFriendRequests,
    removeFriendRequest,
    addFriends,
    addMemberInGroup,
    removeMemberFromGroup,
    emptyMembersFromGroup,
    setGroups,
} = userInformation.actions;

export default userInformation.reducer;

export const selectCurrentUser = (state: any) => state.userInformation.userName;
export const selectCurrentEmail = (state: any) => state.userInformation.email;
export const selectFriendRequests = (state: any) => state.userInformation.friendRequests;
export const selectFriends = (state: any) => state.userInformation.friends;
export const selectMembersForGroup = (state: any) =>
    state.userInformation.membersForGroups;
export const selectGroups = (state: any) => state.userInformation.Groups;
