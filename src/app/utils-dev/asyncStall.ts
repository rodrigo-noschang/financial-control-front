export async function asyncStall(timeout: number = 2500) {
  return await new Promise(resolve => setTimeout(resolve, timeout));
}