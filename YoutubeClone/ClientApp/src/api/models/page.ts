export default interface Page<T> {
    continueToken?: string;
    totalRows: number;
    rows: T[];
}