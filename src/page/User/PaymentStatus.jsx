import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ComButton from "../../Components/ComButton/ComButton";
import paymentSuccess from "../../assets/paymentSuccess.gif";
import paymentFail from "../../assets/paymentFail.gif";
import { LanguageContext } from "../../contexts/LanguageContext";

const PaymentStatus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        text: { paymentPages },
    } = useContext(LanguageContext);

    const searchParams = new URLSearchParams(location.search);
    const isSuccess = searchParams.get("isSuccess");

    const isSuccessPage = isSuccess === "True";

    const bgImageStyle = {
        backgroundColor: isSuccessPage ? "#77B43F" : "red",
        backgroundSize: "cover",
        backgroundPosition: "center",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        position: "relative",
        overflow: "hidden",
    };

    return (
        <section className="relative bg-white py-10 font-serif">
            <div className="flex justify-center">
                <div className="w-full max-w-3xl text-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative">
                            <h1
                                className="text-lg font-montserrat font-black bg-no-repeat bg-center"
                                style={bgImageStyle}
                            >
                                {isSuccessPage ? paymentPages.text.success : paymentPages.text.fail}
                            </h1>
                        </div>
                        <img
                            src={isSuccessPage ? paymentSuccess : paymentFail}
                            alt={isSuccessPage ? "payment success" : "payment fail"}
                            className="w-40 h-40 object-cover my-5"
                        />
                    </div>

                    <div className="mb-5 mx-8">
                        <h3 className="text-base font-semibold font-montserrat uppercase">
                            {isSuccessPage ? paymentPages.text.thankyou : paymentPages.text.error}
                        </h3>
                        <p className="text-sm font-montserrat mb-10">
                            {isSuccessPage ? paymentPages.text.successBackToApp : paymentPages.text.failBackToApp}
                        </p>
                    </div>
                    <ComButton onClick={() => navigate("/")} className={isSuccessPage ? 'bg-lime-600' : 'bg-red-500'}>
                        {paymentPages.btn.home}
                    </ComButton>
                </div>
            </div>
        </section>
    );
};

export default PaymentStatus;
