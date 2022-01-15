export default interface Page<T> {
    continueToken: string | null;
    rows: T[];
}