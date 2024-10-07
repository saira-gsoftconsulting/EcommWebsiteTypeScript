import FeaturesSection from "../components/common/featuressection";
import HeroBreadCrumbOne from "../components/common/heroBreadCrumbOne";
import Layout from "../components/common/layout";
import Checkout from "../components/checkOutPage/checkOutComp";
function CheckOutPage() {
  return (
    <div>
      <Layout>
        <HeroBreadCrumbOne route={"Checkout"} />
        <Checkout />
        {/* <CheckoutForm /> */}
        <FeaturesSection />
      </Layout>
    </div>
  );
}
export default CheckOutPage;
