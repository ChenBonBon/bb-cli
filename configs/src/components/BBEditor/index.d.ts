import * as React from 'react';
export interface IBBEditorProps {
	html?: string;
	onChange?: (id: string) => void;
}

export default class BBEditor extends React.Component<IBBEditorProps, any> {}
