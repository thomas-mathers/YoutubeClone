export default interface Page<T> {
    continueToken: string | null;
    totalRows: number;
    rows: T[];
}