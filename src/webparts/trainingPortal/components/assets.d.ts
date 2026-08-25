// Describes the URL returned when a PNG asset is imported by webpack.
declare module "*.png" {
 const imageUrl: string;
 export default imageUrl;
}
