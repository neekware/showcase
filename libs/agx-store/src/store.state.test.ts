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

  it('should claim & release a slice without error', () => {
    expect(() => storeState.claim('count')).not.toThrow();
  });

  it('should update the state of a claimed slice using a reducer function', () => {
    const claimId = storeState.claim('count');
    const login = () => {
      return { auth: { isLoggedIn: true } };
    };
    const updatedState = storeState.update(claimId, login, 'login');
    expect(updatedState).toEqual({ auth: { isLoggedIn: true } });
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

  it('should update the state of a claimed slice using a partial state object', () => {
    const claimId = storeState.claim('auth');
    const updatedState = storeState.update(claimId, { auth: { isLoggedIn: true } }, 'login');
    expect(updatedState).toEqual({ auth: { isLoggedIn: true } });
  });

  it('should release a claimed slice without error', () => {
    const claimId = storeState.claim('auth');
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
    expect(logger).toHaveBeenCalledTimes(2);
  });

  it('should throw an error when attempting to update an invalid slice', () => {
    expect(() => storeState.update('invalid', { auth: { isLoggedIn: true } }, 'login')).toThrow(
      'No claim registered with ID "invalid".'
    );
  });
});

// now test immutable set to false
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

  it('should create an instance', () => {
    expect(storeState).toBeTruthy();
  });

  it('should claim & release a slice without error', () => {
    expect(() => storeState.claim('count')).not.toThrow();
  });

  it('should update the state of a claimed slice using a reducer function', () => {
    const claimId = storeState.claim('count');
    const login = () => {
      return { auth: { isLoggedIn: true } };
    };
    const updatedState = storeState.update(claimId, login, 'login');
    expect(updatedState).toEqual({ auth: { isLoggedIn: true } });
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

  it('should update the state of a claimed slice using a partial state object', () => {
    const claimId = storeState.claim('auth');
    const updatedState = storeState.update(claimId, { auth: { isLoggedIn: true } }, 'login');
    expect(updatedState).toEqual({ auth: { isLoggedIn: true } });
  });

  it('should release a claimed slice without error', () => {
    const claimId = storeState.claim('auth');
    expect(() => storeState.release(claimId)).not.toThrow();
  });
});
