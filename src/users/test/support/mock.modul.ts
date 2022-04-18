export abstract class MockModel<T> {
	protected abstract entitySub: T;
	constructor(userEntity: T) {
		this.constructorSpy(userEntity);
	}
}
