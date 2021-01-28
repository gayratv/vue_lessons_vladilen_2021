import {
  ActionContext,
  ActionTree,
  GetterTree,
  MutationTree,
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from "vuex";

import { State as RootState } from "@/store";

// Declare state
export type State = {
  isAuthenticated: boolean;
};

// Create initial state
const state: State = {
  isAuthenticated: false
};

// mutations enums
export enum MutationTypes {
  SET_USER_AUTHENTICATED = "SET_USER_AUTHENTICATED"
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_USER_AUTHENTICATED](state: S): void;
};

// Define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER_AUTHENTICATED](state: State) {
    state.isAuthenticated = true;
  }
};

// Action enums
export enum ActionTypes {
  SIGNIN = "SIGNIN"
}

// Actions context
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

// Actions contracts
export interface Actions {
  [ActionTypes.SIGNIN](
    { commit }: AugmentedActionContext,
    payload: { username: string; password: string }
  ): void;
}

// Define actions
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.SIGNIN](
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { commit },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    payload: { username: string; password: string }
  ) {
    try {
      // some logic that logs a user in
    } catch (err) {
      // some error handling logic
    }
  }
};

// getters types
export type Getters = {
  isAuthenticated(state: State): boolean;
};

// getters
export const getters: GetterTree<State, RootState> & Getters = {
  isAuthenticated: state => {
    return state.isAuthenticated;
  }
};

//setup store type
export type Store<S = State> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const AuthModule: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters
  // Namespacing Vuex modules is tricky and hard to type check with typescript.
  // Instead of namespacing, we could create our own namespacing mechanism by
  // prefixing the value of the TypeScript enum with the namespace, e.g.
  // enum TodoActions {
  //   AddTodo = 'TODO__ADD_TODO'
  // }
  // namespaced: true,
};
