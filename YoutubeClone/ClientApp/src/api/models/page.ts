export default interface Page<T> {
    continuationToken?: string;
    rows: T[];
}