"use client"
import { RadioGroup, RadioOption } from "@/shared/ui/RadioGroup"
import { useState } from "react"
import s from "./AccountManagement.module.scss"
import { PayPalIcon } from "@/shared/assets/icons/components/PayPalIcon"
import { StripeIcon } from "@/shared/assets/icons/components/StripeIcon"
import { ModalWindow } from "@/shared/ui/ModalWindow"
import {
  useCreateSubscriptionMutation,
  useGetSubscriptionQuery,
  useCanceledAutoRenewalMutation,
  useRenewAutoRenewalMutation,
} from "@/features/settings/api/settingsApi"
import { PaymentType, TypeSubscription } from "@/features/settings/api/settingsApi.types"
import { useSearchParams } from "next/navigation"
import { CurrentSubscription } from "./CurrentSubscription/CurrentSubscription"
import { boolean } from "zod"

export const AccountManagement = () => {
  const accountTypeOptions: RadioOption[] = [
    { value: "PERSONAL", label: "Personal" },
    { value: "BUSINESS", label: "Business" },
  ]

  const typeSubscriptionOptions: RadioOption[] = [
    { value: "DAY", label: "$10 per 1 Day" },
    { value: "WEEKLY", label: "$50 per 7 Day" },
    { value: "MONTHLY", label: "$100 per month" },
  ]

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation()

  // =========================
  // Отмена автоплатежа
  const [canceledSubscription] = useCanceledAutoRenewalMutation()
  // Включение автоплатежа
  const [renewSubscription] = useRenewAutoRenewalMutation()
  // Получение действующих подписок
  const { data: subscription, error } = useGetSubscriptionQuery()
  // Проверка автоплатежа
  console.log("Запрос", subscription?.hasAutoRenewal)
  // =========================
  const [selectedAccountType, setSelectedAccountType] = useState(accountTypeOptions[0].value)
  const [selectedTypeSubscription, setSelectedTypeSubscription] = useState(typeSubscriptionOptions[0].value)
  const [selectedPaymentType, setSelectedPaymentType] = useState("CREDIT_CARD")
  const [agree, setAgree] = useState(false)
  const searchParams = useSearchParams()
  const success = searchParams.get("success")
  const [openPaymentModal, setOpenPaymentModal] = useState(false)
  const [openInfoModal, setOpenInfoModal] = useState(true)

  const accountTypeChange = (value: string) => {
    setSelectedAccountType(value)
  }

  const typeSubscriptionChange = (value: string) => {
    setSelectedTypeSubscription(value)
  }
  // =========================
  const cheakBoxHandler = () => {
    if (subscription?.hasAutoRenewal) {
      canceledSubscription().then(() => {
        setSelectedAccountType(accountTypeOptions[0].value)
      })
      // Обработка ошибок ?
    } else {
      renewSubscription()
      // Обработка ошибок ?
    }
  }
  // =========================
  const createPaymentHandler = () => {
    createSubscription({
      typeSubscription: selectedTypeSubscription as TypeSubscription,
      paymentType: selectedPaymentType as PaymentType,
      amount: 0,
      baseUrl: window.location.href,
    }).then((res) => {
      if (res.data) window.location.href = res.data.url
    })
  }
  return (
    <div className={s.container}>
      {/* ========================= */}
      {selectedAccountType === "BUSINESS" && (
        <>
          <CurrentSubscription
            date={subscription?.data[0]?.endDateOfSubscription}
            autoRenewal={subscription?.hasAutoRenewal}
            handler={() => {
              cheakBoxHandler()
            }}
          />
        </>
      )}
      {/* ========================= */}
      <RadioGroup
        options={accountTypeOptions}
        name={"account-type"}
        label={"Account Type"}
        value={selectedAccountType}
        onChange={accountTypeChange}
      />
      {selectedAccountType === "BUSINESS" && (
        <>
          <RadioGroup
            options={typeSubscriptionOptions}
            name={"costs"}
            label={"Your subscription costs:"}
            value={selectedTypeSubscription}
            onChange={typeSubscriptionChange}
          />
          <div className={s.costContainer}>
            <button
              onClick={() => {
                setSelectedPaymentType("PAYPAL")
                setOpenPaymentModal(true)
              }}
            >
              <PayPalIcon />
            </button>
            <span style={{ display: "flex", alignItems: "center" }}>Or</span>
            <button
              onClick={() => {
                setSelectedPaymentType("STRIPE")
                setOpenPaymentModal(true)
              }}
            >
              <StripeIcon />
            </button>
          </div>
          <ModalWindow
            title={"Create payment"}
            open={openPaymentModal}
            onClose={() => setOpenPaymentModal(false)}
            description={
              "Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings"
            }
            buttonsContent={{
              buttons: [
                {
                  title: "OK",
                  onClick: async () => {
                    await createPaymentHandler()
                    setOpenPaymentModal(false)
                  },
                  disabled: !agree || isLoading,
                },
              ],
              className: s.modalButtons,
            }}
            checkBoxContent={{ onChange: setAgree, title: "I agree" }}
          />
        </>
      )}
      {searchParams.has("success") &&
        (success === "true" ? (
          <ModalWindow
            title={"Success"}
            open={openInfoModal}
            onClose={() => setOpenInfoModal(false)}
            description={"Payment was successful!"}
            buttonsContent={{
              buttons: [
                {
                  title: "OK",
                  onClick: () => {
                    setOpenInfoModal(false)
                  },
                },
              ],
              className: s.infoButtons,
            }}
          />
        ) : (
          <ModalWindow
            title={"Error"}
            open={openInfoModal}
            onClose={() => setOpenInfoModal(false)}
            description={"Transaction failed. Please, write to support"}
            buttonsContent={{
              buttons: [
                {
                  title: "Back to payment",
                  onClick: () => {
                    setOpenInfoModal(false)
                  },
                },
              ],
              className: s.infoButtons,
            }}
          />
        ))}
    </div>
  )
}
