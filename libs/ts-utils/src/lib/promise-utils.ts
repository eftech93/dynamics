export async function batch<K>(promises: Promise<K>[], batchSize: number): Promise<K[]> {
    let position = 0;
    const results: K[] = [];

    // Process batches sequentially
    while (position < promises.length) {
        const itemsForBatch = promises.slice(position, position + batchSize);
        const batchResult = await Promise.all(itemsForBatch);  // Wait for this batch to resolve
        results.push(...batchResult);  // Accumulate results
        position += batchSize;
    }

    return results;
}
