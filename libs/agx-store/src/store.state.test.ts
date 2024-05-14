import { StoreState } from './store.state';

interface AuthState {
  token: string;
  isLoggedIn: boolean;
}

interface ThemeState {
  name: string;
  color: string;
}

interface TestStoreState {
  auth: AuthState;
  theme: ThemeState;
  [key: string]: unknown;
}

jest.spyOn(console, 'log').mockImplementation(() => {});

describe('StoreState', () => {
  let storeState: StoreState<TestStoreState>;

  beforeEach(() => {
    const initialState = { auth: { token: '', isLoggedIn: false }, theme: { name: '', color: '' } };
    storeState = new StoreState(initialState);
  });

  afterEach(() => {
    storeState.reset();
    storeState = null!;
  });

  it('should create an instance', () => {
    expect(storeState).toBeTruthy();
  });

  it('should release a claimed slice without error', () => {
    const claimId = storeState.claim('auth');
    expect(() => storeState.release(claimId)).not.toThrow();
  });

  it('should not be able to update immutable state', () => {
    const state = storeState.state();

    expect(() => {
      state.auth.isLoggedIn = true;
    }).toThrow("Cannot assign to read only property 'isLoggedIn' of object '#<Object>'");
  });

  it('should update the state of a claimed slice using a reducer function', () => {
    const claimId = storeState.claim('count', console.log);
    const login = () => {
      return { auth: { isLoggedIn: true } };
    };
    const updatedState = storeState.update(claimId, login, 'login');
    expect(updatedState).toEqual({ auth: { isLoggedIn: true } });
  });

  it('should update the state of a claimed slice using a partial state object', () => {
    const claimId = storeState.claim('auth');
    const updatedState = storeState.update(claimId, { auth: { isLoggedIn: true } }, 'login');
    expect(updatedState).toEqual({ auth: { isLoggedIn: true } });
  });

  it('should update the state with a top level key:value', () => {
    const claimId = storeState.claim('key', console.log);
    const result = storeState.update(claimId, 'value');

    expect(result).toBe('value');
    expect(storeState.state().key).toBe('value');
  });

  it('should retrieve the current state', () => {
    const currentState = storeState.state();
    expect(currentState).toEqual({
      auth: { token: '', isLoggedIn: false },
      theme: { name: '', color: '' },
    });
  });

  it('should provide an Observable stream of the current store state', (done) => {
    storeState.state$().subscribe((state) => {
      expect(state).toEqual({
        auth: { token: '', isLoggedIn: false },
        theme: { name: '', color: '' },
      });
      done();
    });
  });

  it('should select and return a specific slice of the store state as an Observable', (done) => {
    storeState.select$<AuthState>('auth').subscribe((authState) => {
      expect(authState).toEqual({ token: '', isLoggedIn: false });
      done();
    });
  });

  it('should release a claimed slice without error', () => {
    const claimId = storeState.claim('auth', console.log);
    expect(() => storeState.release(claimId)).not.toThrow();
  });

  it('should throw an error when attempting to claim the same slice twice', () => {
    storeState.claim('auth');
    expect(() => storeState.claim('auth')).toThrow('Slice "auth" already claimed.');
  });

  it('should throw an error when attempting to release an unclaimed slice', () => {
    expect(() => storeState.release('auth')).toThrow('Slice "auth" not claimed.');
  });

  it('should throw an error when attempting to claim a slice with an invalid or empty claimId', () => {
    expect(() => storeState.claim('')).toThrow('Invalid slice name "".');
  });

  it('should throw an error when attempting to release an invalid slice', () => {
    expect(() => storeState.release('')).toThrow('Slice "" not claimed.');
  });

  it('should log the previous and next state when updating a claimed slice', () => {
    const logger = jest.fn();
    const claimId = storeState.claim('auth', logger);
    storeState.update(claimId, { auth: { isLoggedIn: true } }, 'login');
    expect(logger).toHaveBeenCalledTimes(3); // claim, prev, next
  });

  it('should throw an error when attempting to update an invalid slice', () => {
    expect(() => storeState.update('invalid', { auth: { isLoggedIn: true } }, 'login')).toThrow(
      'No claim registered with ID "invalid".'
    );
  });
});

describe('StoreState (mutable)', () => {
  let storeState: StoreState<TestStoreState>;

  beforeEach(() => {
    const initialState = { auth: { token: '', isLoggedIn: false }, theme: { name: '', color: '' } };
    storeState = new StoreState(initialState, false);
  });

  afterEach(() => {
    storeState.reset();
    storeState = null!;
  });

  it('should create an mutable instance', () => {
    expect(storeState).toBeTruthy();
  });

  it('should be able to update immutable state', () => {
    const state = storeState.state();

    expect(() => {
      state.auth.isLoggedIn = true;
    }).not.toThrow("Cannot assign to read only property 'isLoggedIn' of object '#<Object>'");
  });
});
