export default async(ctx) => {
    // use this file to load endpoints at app startup
    await Promise.all([
        ctx.store.dispatch("getData", { resource: "property" }),
        // ctx.store.dispatch("getData", { resource: "hours" }),  
        // ctx.store.dispatch("getData", { resource: "repos" }), 
        // ctx.store.dispatch("getData", { resource: "stores" })
    ]);
}