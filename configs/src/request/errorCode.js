const errorCode = {
	// common
	INTERNAL: { id: 'error.internal' },
	INVALID_USERNAME: { id: 'error.account.not.exist' },
	INVALID_VALUE: { id: 'error.invalid.value', value: 'property' },
	LOST_PARAMETER: { id: 'error.lost.parameter', value: 'property' },
	NOT_FOUND: { id: 'error.not.found' },
	ALREADY_EXISTS: { id: 'error.already.exists' },
	FAILED_PRECONDITION: { id: 'error.failed.precondition' },
	ABORTED: { id: 'error.aborted' },
	OUT_OF_RANGE: { id: 'error.out.of.range' },
	DATA_LOSS: { id: 'error.data.loss' },
	UN_AUTHENTICATED: { id: 'error.unauthenticated' },
	PERMISSION_DENIED: { id: 'error.permission.denied' },
};

export default errorCode;
