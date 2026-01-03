import { zodResolver } from "@hookform/resolvers/zod";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import isiIcon from '../assets/images/isi-icon.png';
import PublicFooter from '../components/PublicFooter';
import PublicHeader from '../components/PublicHeader';
import { apiService } from "../services";


// Define the validation schema
const createUserSchema = z
  .object({
    personalName: z
      .string()
      .min(1, "Personal name is required")
      .min(2, "Personal name must be at least 2 characters"),
    middleInitial: z.string().optional(),
    familyName: z
      .string()
      .min(1, "Family name is required")
      .min(2, "Family name must be at least 2 characters"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    affiliationUniversity: z
      .string()
      .min(1, "Affiliation/University is required"),
    department: z.string().min(1, "Department is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    repeatPassword: z.string().min(1, "Please repeat your password"),
    isSubscribe: z.boolean().optional(),
    // ✅ Add role field here
    captchaCode: z.string().min(1, "Captcha code is required"),
    paymentType: z.string().optional(),
    role: z.string().optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

type CreateUserFormData = z.infer<typeof createUserSchema>;

type PlanType =
  | '1y-basic'
  | '1y-sponsor'
  | '5y-basic'
  | '5y-sponsor'
  | 'life-basic'
  | 'life-sponsor';

interface PayPalPlan {
  id: string;
  planType: PlanType;
  product_id: string;
  name: string;
  status: string;
  description: string;
  version: number;
  billing_cycles: any[];
}

const JoinISIPage: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PayPalPlan[]>([]);
  const [plan, setPlan] = useState<PlanType | null>(null);
  // const [plan, setPlan] = React.useState<'1y-basic' | '1y-sponsor' | '5y-basic' | '5y-sponsor' | 'life-basic' | 'life-sponsor'>('1y-basic');
  const [captchaCode, setCaptchaCode] = useState("7VJ7R1EE");
  const [selectedMembershipType, setSelectedMembershipType] = useState<'FREE' | 'MEMBER'>('FREE');

  const paypalOptions = {
    clientId: "ATy1yaAt6LRPKybBgy6Yuy_pIKRSENq67tm7il2NpBlUPYznsI-JIDn_hE2UUvVj9U6t6HKXuwzYEmk1",
    currency: 'USD',
    intent: 'subscription',
    vault: true,
    components: 'buttons',
  };

  const location = useLocation();

  useEffect(() => {
    const handleSuccess = async () => {
      const params = new URLSearchParams(location.search);
      // alert(params)
      console.log("params :", params)
      const paymentId = params.get('paymentId');
      const payerId = params.get('PayerID');
      const token = params.get('token');
      const subscriptionId = params.get('subscriptionId');

      try {
        // Verify payment with backend
        if (paymentId && payerId) {
          await apiService.post("/user/verify-payment", {
            paymentId,
            payerId,
            token,
            subscriptionId
          });
        }

        // Show success message in session storage to pass to join page
        sessionStorage.setItem('paymentSuccess', 'true');
        sessionStorage.setItem('subscriptionId', subscriptionId || '');

        // Redirect to join-isi page
        navigate('/join-isi');

      } catch (error) {
        console.error("Payment verification error:", error);
        navigate('/join-isi');
      }
    };

    handleSuccess();
  }, [location, navigate]);

  useEffect(() => {
    const data: PayPalPlan[] = [
      {
        "id": "P-98P507856D497622UNFETDNA",
        "planType": "1y-basic",
        "version": 1,
        "product_id": "PROD-4KP56367VU896645C",
        "name": "Basic - 1 Year",
        "status": "ACTIVE",
        "description": "Basic membership for 1 year",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "version": 1,
              "fixed_price": {
                "currency_code": "USD",
                "value": "75.0"
              },
              "create_time": "2025-12-22T11:55:32.000Z",
              "update_time": "2025-12-22T11:55:32.000Z"
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 1
          }
        ]
      },
      {
        "id": "P-60U54129JF267354NNFETFXY",
        "planType": "1y-sponsor",
        "version": 1,
        "product_id": "PROD-2J870760NC067493P",
        "name": "Sponsoring - 1 Year",
        "status": "ACTIVE",
        "description": "Sponsoring membership for 1 year",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "version": 1,
              "fixed_price": {
                "currency_code": "USD",
                "value": "125.0"
              },
              "create_time": "2025-12-22T12:00:31.000Z",
              "update_time": "2025-12-22T12:00:31.000Z"
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 1
          }
        ],
      },
      {
        "id": "P-7GB94956Y9580284ANFETJOY",
        "planType": "5y-sponsor",
        "version": 1,
        "product_id": "PROD-2J870760NC067493P",
        "name": "Sponsoring - 5 Year",
        "status": "ACTIVE",
        "description": "Sponsoring membership for 5 year",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "fixed_price": {
                "currency_code": "USD",
                "value": "500.0"
              }
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 5
          }
        ],

      },
      {
        "id": "P-5VR93344AX120281NNFETKWY",
        "planType": "life-sponsor",
        "version": 1,
        "product_id": "PROD-2J870760NC067493P",
        "name": "Sponsoring - Life",
        "status": "ACTIVE",
        "description": "Lifetime sponsoring membership",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "fixed_price": {
                "currency_code": "USD",
                "value": "5000.0"
              }
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 99
          }
        ],
      },
      {
        "id": "P-3C184425140228839NFETLEY",
        "planType": "life-basic",
        "version": 1,
        "product_id": "PROD-4KP56367VU896645C",
        "name": "Basic - Life",
        "status": "ACTIVE",
        "description": "Basic sponsoring membership",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "fixed_price": {
                "currency_code": "USD",
                "value": "1000.0"
              }
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 99
          }
        ],
      },
      {
        "id": "P-4G4391977B902291XNFETLNI",
        "planType": "5y-basic",
        "version": 1,
        "product_id": "PROD-4KP56367VU896645C",
        "name": "Basic - 5 Year",
        "status": "ACTIVE",
        "description": "Basic membership for 5 years",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "fixed_price": {
                "currency_code": "USD",
                "value": "300.0"
              }
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 5
          }
        ]
      }
    ]
    setPlans(data);
  }, []);

  const getPrice = (type: PlanType) => {
    const p = plans.find(p => p.planType === type);
    return p?.billing_cycles?.[0]?.pricing_scheme?.fixed_price?.value ?? '--';
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    mode: "onTouched",
    defaultValues: {
      personalName: "",
      middleInitial: "",
      familyName: "",
      city: "",
      country: "",
      affiliationUniversity: "",
      department: "",
      email: "",
      password: "",
      repeatPassword: "",
      isSubscribe: false,
      captchaCode: "",
      role: "user", // Default role can be set here
      paymentType: undefined,
    },
  });

  useEffect(() => {
    // dispatch(fetchCombineJournals());
    let list = [
      {
        "id": "P-98P507856D497622UNFETDNA",
        "version": 1,
        "product_id": "PROD-4KP56367VU896645C",
        "name": "Basic - 1 Year",
        "status": "ACTIVE",
        "description": "Basic membership for 1 year",
        "usage_type": "LICENSED",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "version": 1,
              "fixed_price": {
                "currency_code": "USD",
                "value": "75.0"
              },
              "create_time": "2025-12-22T11:55:32.000Z",
              "update_time": "2025-12-22T11:55:32.000Z"
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 1
          }
        ],
        "payment_preferences": {
          "service_type": "PREPAID",
          "auto_bill_outstanding": true,
          "setup_fee": {
            "currency_code": "USD",
            "value": "0.0"
          },
          "setup_fee_failure_action": "CONTINUE",
          "payment_failure_threshold": 3
        },
        "taxes": {
          "percentage": "0.0",
          "inclusive": false
        },
        "quantity_supported": false,
        "payee": {
          "merchant_id": "JA5LJSP4AEF6J",
          "display_data": {
            "business_email": "cs-sb-ueo2x47642986@business.example.com",
            "business_phone": {
              "country_code": "91",
              "national_number": "+91 9520481068"
            }
          }
        },
        "create_time": "2025-12-22T11:55:32.000Z",
        "update_time": "2025-12-22T11:55:32.000Z",
        "links": [
          {
            "href": "https://api.sandbox.paypal.com/v1/billing/plans/P-98P507856D497622UNFETDNA",
            "rel": "self",
            "method": "GET",
            "encType": "application/json"
          }
        ]
      },
      {
        "id": "P-60U54129JF267354NNFETFXY",
        "version": 1,
        "product_id": "PROD-2J870760NC067493P",
        "name": "Sponsoring - 1 Year",
        "status": "ACTIVE",
        "description": "Sponsoring membership for 1 year",
        "usage_type": "LICENSED",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "version": 1,
              "fixed_price": {
                "currency_code": "USD",
                "value": "125.0"
              },
              "create_time": "2025-12-22T12:00:31.000Z",
              "update_time": "2025-12-22T12:00:31.000Z"
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 1
          }
        ],
        "payment_preferences": {
          "service_type": "PREPAID",
          "auto_bill_outstanding": true,
          "setup_fee": {
            "currency_code": "USD",
            "value": "0.0"
          },
          "setup_fee_failure_action": "CONTINUE",
          "payment_failure_threshold": 3
        },
        "taxes": {
          "percentage": "0.0",
          "inclusive": false
        },
        "quantity_supported": false,
        "payee": {
          "merchant_id": "JA5LJSP4AEF6J",
          "display_data": {
            "business_email": "cs-sb-ueo2x47642986@business.example.com"
          }
        },
        "create_time": "2025-12-22T12:00:31.000Z",
        "update_time": "2025-12-22T12:00:31.000Z",
        "links": []
      },
      {
        "id": "P-7GB94956Y9580284ANFETJOY",
        "version": 1,
        "product_id": "PROD-2J870760NC067493P",
        "name": "Sponsoring - 5 Year",
        "status": "ACTIVE",
        "description": "Sponsoring membership for 5 year",
        "usage_type": "LICENSED",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "fixed_price": {
                "currency_code": "USD",
                "value": "500.0"
              }
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 5
          }
        ],
        "links": []
      },
      {
        "id": "P-5VR93344AX120281NNFETKWY",
        "version": 1,
        "product_id": "PROD-2J870760NC067493P",
        "name": "Sponsoring - Life",
        "status": "ACTIVE",
        "description": "Lifetime sponsoring membership",
        "usage_type": "LICENSED",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "fixed_price": {
                "currency_code": "USD",
                "value": "5000.0"
              }
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 99
          }
        ],
        "links": []
      },
      {
        "id": "P-3C184425140228839NFETLEY",
        "version": 1,
        "product_id": "PROD-4KP56367VU896645C",
        "name": "Basic - Life",
        "status": "ACTIVE",
        "description": "Basic sponsoring membership",
        "usage_type": "LICENSED",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "fixed_price": {
                "currency_code": "USD",
                "value": "1000.0"
              }
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 99
          }
        ],
        "links": []
      },
      {
        "id": "P-4G4391977B902291XNFETLNI",
        "version": 1,
        "product_id": "PROD-4KP56367VU896645C",
        "name": "Basic - 5 Year",
        "status": "ACTIVE",
        "description": "Basic membership for 5 years",
        "usage_type": "LICENSED",
        "billing_cycles": [
          {
            "pricing_scheme": {
              "fixed_price": {
                "currency_code": "USD",
                "value": "300.0"
              }
            },
            "frequency": {
              "interval_unit": "YEAR",
              "interval_count": 1
            },
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 5
          }
        ],
        "links": []
      }
    ];
    console.log("Fetched combine journals :", list);
  }, []);

  const PLAN_IDS = {
    '1y-basic': 'P-98P507856D497622UNFETDNA',
    '1y-sponsor': 'P-60U54129JF267354NNFETFXY',
    '5y-basic': 'P-4G4391977B902291XNFETLNI',
    '5y-sponsor': 'P-7GB94956Y9580284ANFETJOY',
    'life-basic': 'P-3C184425140228839NFETLEY',
    'life-sponsor': 'P-5VR93344AX120281NNFETKWY',
  };

  const getPlanId = (type: PlanType | null): string | undefined => {
    if (!type) return undefined;
    return plans.find(p => p.planType === type)?.id;
  };

  const getMembershipType = (): "FREE" | "BASIC" | "SPONSORING" => {
    if (selectedMembershipType === "FREE") {
      return "FREE";
    }
    
    if (!plan) {
      return "FREE";
    }
    
    // Check if plan is sponsoring type
    if (plan.includes("sponsor")) {
      return "SPONSORING";
    }
    
    // Otherwise it's a basic plan
    return "BASIC";
  };

  const onSubmit = async (data: CreateUserFormData) => {
    if ((selectedMembershipType !== "FREE" && !plan)) {
      toast.error("Please select a membership plan.");
      return;
    }
    // if (data.captchaCode.toUpperCase() !== captchaCode) {
    //   toast.error("Invalid captcha code. Please try again.");
    //   generateCaptcha();
    //   return;
    // }
    try {
      const { isSubscribe, captchaCode, repeatPassword, ...rest } = data;
      const membershipType = getMembershipType();
      const payload = {
        ...rest,
        membershipType,
        ...(selectedMembershipType !== "FREE" ? { paymentType: "MEMBER", planId: getPlanId(plan) } : { paymentType: "FREE" }),
      };
      const response = await apiService.post("/user/", payload);
      console.log("API updated response :", response);
      
      // Navigate to /about after successful signup for both free and paid memberships
      toast.success("Sign up successful!");
      navigate("/about");

      // toast.success("user updated succesfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.data?.message || "Sign up failed. Please try again.");
      console.error("Error updating:", error);
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 8; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(newCaptcha);
    setValue("captchaCode", "");
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-white font-['Roboto'] text-[#3E3232]">
        <PublicHeader />

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-[1460px]  w-[90%]  mx-auto">
            {/* Top form area (Contact page style) */}
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_440px] gap-6">
                <section className="space-y-6 mt-[10px]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Personal Name</label>
                      <input {...register("personalName")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                      {errors.personalName && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.personalName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Middle Initial</label>
                      <input {...register("middleInitial")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                    </div>
                    <div>
                      <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Family Name</label>
                      <input {...register("familyName")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                      {errors.familyName && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.familyName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Affiliation/University</label>
                      <input {...register("affiliationUniversity")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                      {errors.affiliationUniversity && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.affiliationUniversity.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Department</label>
                      <input {...register("department")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                      {errors.department && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.department.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-[#3E3232] mb-3 font-semibold">City</label>
                      <input {...register("city")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                      {errors.city && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Country</label>
                      <input {...register("country")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                      {errors.country && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Your Email <span className="font-normal">(We Will Send A Confirmation Email To This Account)</span></label>
                      <input {...register("email")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-sm">
                    <input {...register("isSubscribe")} type="checkbox" className="accent-[#295F9A]" />
                    Subscribe to our mailing list
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    <div>
                      <label className="block text-xs text-[#3E3232]  font-semibold">Set Your Password <span className="font-normal">(8 Characters Or Longer)</span></label>
                      <input {...register("password")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                      {errors.password && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-[#3E3232]  font-semibold">Repeat Password (Enter Password Again)</label>
                      <input {...register("repeatPassword")} className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                      {errors.repeatPassword && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.repeatPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Captcha panel */}
                <aside className="w-full xl:w-[440px] flex-shrink-0 h-full">
                  <div className="text-xs text-[#3E3232] mb-3 font-semibold">Enter The Code Below</div>
                  <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: '#F5F5F5' }}>

                    <div className="rounded-2xl min-h-[80%] pt-3 border border-dashed border-[#E1E1E1] bg-[#F5F5F5] mx-auto w-[440px] max-w-full flex items-center justify-center flex-col">
                      <div className="font-mono tracking-widest text-[#295F9A] text-2xl sm:text-3xl select-none">{captchaCode}</div>
                      <button onClick={generateCaptcha} className="px-6 mt-[15%] mb-4 py-2 rounded-xl border border-gray-300 text-[#3E3232] font-medium hover:shadow-sm mt-5">Refresh</button>
                    </div>
                    <input {...register("captchaCode")} className="w-full h-10 border border-[#E1E1E1] rounded-md px-3 mt-5" style={{ backgroundColor: '#F5F5F5' }} placeholder="Enter code here" />
                    {errors.captchaCode && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.captchaCode.message}
                      </p>
                    )}
                  </div>
                </aside>
              </div>

              {/* Pricing cards (reuse Community styles) */}
              <div className="pt-12 grid grid-cols-1 md:grid-cols-2 justify-center items-stretch gap-12 mt-12 max-w-[900px] mx-auto">
                {/* Associate */}
                <div 
                  onClick={() => setSelectedMembershipType('FREE')}
                  className={`shadow-md overflow-hidden w-full max-w-[380px] mx-auto flex flex-col cursor-pointer transition-all ${
                    selectedMembershipType === 'FREE' ? 'ring-2 ring-[#295F9A] bg-[#295f9a15]' : ''
                  }`}
                >
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="text-[24px] font-semibold text-[#2D3748] mb-5">ISI associate</div>
                      <img src={isiIcon} alt="isi" className="w-[25px] object-contain" />
                    </div>
                    <div className="mt-5 h-28 bg-[#295f9a47] flex items-center justify-center text-[24px] font-semibold text-[#2D3748] mb-5">FREE</div>
                    <div className="mt-4 text-[16px] text-[#4A5568] mb-4">ISI Associates receive access to the following benefits ss:</div>
                    <ul className="my-4 space-y-4 text-[16px] text-[#000] font-medium max-w-[250px] w-full mx-auto">
                      {['Article Submission', 'Article Review', 'Personalized Dashboard'].map(i => (
                        <li key={i} className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#295F9A" /><path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white" /></svg>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Member */}
                <div 
                  onClick={() => setSelectedMembershipType('MEMBER')}
                  className={`shadow-md overflow-hidden w-full max-w-[380px] mx-auto flex flex-col cursor-pointer transition-all ${
                    selectedMembershipType === 'MEMBER' ? 'ring-2 ring-[#295F9A] bg-[#295f9a15]' : ''
                  }`}
                >
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="text-[24px] font-semibold text-[#2D3748] mb-5">ISI Member</div>
                      <img src={isiIcon} alt="isi" className="w-[25px] object-contain" />
                    </div>
                    {/* Small pricing table */}
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-[12px]">
                        <thead>
                          <tr className="text-left  text-[#000] font-medium">
                            <th className="py-2 pr-3"></th>
                            <th className="py-2 pr-3">Basic</th>
                            <th className="py-2 pr-3">Sponsoring</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t font-bold text-[#2D3748]">
                            <td className="py-2 pr-3">1 Year</td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year1" checked={plan === '1y-basic'} onChange={(e) => { e.stopPropagation(); setPlan('1y-basic'); setSelectedMembershipType('MEMBER'); }} /> ${getPrice('1y-basic')} USD</label></td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year1" checked={plan === '1y-sponsor'} onChange={(e) => { e.stopPropagation(); setPlan('1y-sponsor'); setSelectedMembershipType('MEMBER'); }} /> ${getPrice('1y-sponsor')} USD</label></td>
                          </tr>
                          <tr className="border-t font-bold text-[#2D3748]">
                            <td className="py-2 pr-3">5 Year</td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year5" checked={plan === '5y-basic'} onChange={(e) => { e.stopPropagation(); setPlan('5y-basic'); setSelectedMembershipType('MEMBER'); }} /> ${getPrice('5y-basic')} USD</label></td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year5" checked={plan === '5y-sponsor'} onChange={(e) => { e.stopPropagation(); setPlan('5y-sponsor'); setSelectedMembershipType('MEMBER'); }} /> ${getPrice('5y-sponsor')} USD</label></td>
                          </tr>
                          <tr className="border-t font-bold text-[#2D3748]">
                            <td className="py-2 pr-3">Life</td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="life" checked={plan === 'life-basic'} onChange={(e) => { e.stopPropagation(); setPlan('life-basic'); setSelectedMembershipType('MEMBER'); }} /> ${getPrice('life-basic')} USD</label></td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="life" checked={plan === 'life-sponsor'} onChange={(e) => { e.stopPropagation(); setPlan('life-sponsor'); setSelectedMembershipType('MEMBER'); }} /> ${getPrice('life-sponsor')} USD</label></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 text-[16px] text-[#4A5568] mb-4">ISI Members receive access to the following benefits:</div>
                    <ul className="my-4 space-y-2 text-[16px] text-[#000] font-medium max-w-[250px] w-full mx-auto">
                      {['Article Submission', 'Article Review', 'Personalized Dashboard', 'Member Directory', 'Academic Profile Matching', 'Personalized Notifications', 'Reviewer Certificate', 'Discounts', 'No Article Publication Fee'].map(i => (
                        <li key={i} className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#295F9A" /><path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white" /></svg>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center mt-10 pt-12 pb-12">
                <button type="submit" className="px-12 py-3 rounded-[14px] text-white text-[16px] font-medium" style={{ backgroundColor: '#FF4C7D' }}>Sign Up</button>
                <div className="flex items-center justify-center gap-8 text-sm text-[#3E3232] mt-8">
                  <a href="#" className="hover:underline">ISI Website</a>
                  <a href="#" className="hover:underline">Privacy Policy</a>
                  <a href="#" className="hover:underline">Ethics Policy</a>
                  <a href="#" className="hover:underline">Legal Disclaimer</a>
                </div>
              </div>
            </form>
          </div>
        </main>

        <PublicFooter />
      </div>
    </PayPalScriptProvider>
  );
};

export default JoinISIPage;


