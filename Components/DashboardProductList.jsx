export default function DashboardProductList(props) {
  return (
    <div className="flex">
      <p className="text-Written">{props.data.productName}</p>
      {/* <img src={props.data.productImage} className="w-[50px]" /> */}
    </div>
  );
}
