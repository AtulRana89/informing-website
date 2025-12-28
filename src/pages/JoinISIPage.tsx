import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from 'react';
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

const JoinISIPage: React.FC = () => {
  const [plan, setPlan] = React.useState<'1y-basic' | '1y-sponsor' | '5y-basic' | '5y-sponsor' | 'life-basic' | 'life-sponsor'>('1y-basic');
  const [captchaCode, setCaptchaCode] = useState("7VJ7R1EE");
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


  const onSubmit = async (data: CreateUserFormData) => {
    console.log("Form submitted with data:", data);
    console.log("captchaCode:", captchaCode);
    console.log("data.captchaCode:", data.captchaCode);
    if (data.captchaCode.toUpperCase() !== captchaCode) {
      toast.error("Invalid captcha code. Please try again.");
      generateCaptcha();
      return;
    }

    try {
      const { repeatPassword, ...payload } = data;
      // await apiService.post("/user/", payload);
      console.log("API updated:", payload);
      toast.success("user updated succesfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.data?.message);
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
              <div className="shadow-md overflow-hidden w-full max-w-[380px] mx-auto flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="text-[24px] font-semibold text-[#2D3748] mb-5">ISI associate</div>
                    <img src={isiIcon} alt="isi" className="w-[25px] object-contain" />
                  </div>
                  <div className="mt-5 h-28 bg-[#295f9a47] flex items-center justify-center text-[24px] font-semibold text-[#2D3748] mb-5">FREE</div>
                  <div className="mt-4 text-[16px] text-[#4A5568] mb-4">ISI Associates receive access to the following benefits:</div>
                  <ul className="my-4 space-y-4 text-[16px] text-[#000] font-medium max-w-[250px] w-full mx-auto">
                    {['Article Submission', 'Article Review', 'Personalized Dashboard'].map(i => (
                      <li key={i} className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#295F9A" /><path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white" /></svg>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 bg-[#295F9A] mt-auto">
                  <button onClick={() => setValue("paymentType", "FREE")} type='submit' className="w-full h-11 text-white font-medium">Proceed to Payment</button>
                </div>
              </div>

              {/* Member */}
              <div className="shadow-md overflow-hidden w-full max-w-[380px] mx-auto flex flex-col">
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
                          <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year1" checked={plan === '1y-basic'} onChange={() => setPlan('1y-basic')} /> $75 USD</label></td>
                          <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year1" checked={plan === '1y-sponsor'} onChange={() => setPlan('1y-sponsor')} /> $125 USD</label></td>
                        </tr>
                        <tr className="border-t font-bold text-[#2D3748]">
                          <td className="py-2 pr-3">5 Year</td>
                          <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year5" checked={plan === '5y-basic'} onChange={() => setPlan('5y-basic')} /> $300 USD</label></td>
                          <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year5" checked={plan === '5y-sponsor'} onChange={() => setPlan('5y-sponsor')} /> $500 USD</label></td>
                        </tr>
                        <tr className="border-t font-bold text-[#2D3748]">
                          <td className="py-2 pr-3">Life</td>
                          <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="life" checked={plan === 'life-basic'} onChange={() => setPlan('life-basic')} /> $1000 USD</label></td>
                          <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="life" checked={plan === 'life-sponsor'} onChange={() => setPlan('life-sponsor')} /> $5000 USD</label></td>
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
                <div className="p-5 bg-[#295F9A] mt-auto">
                  <button onClick={() => setValue("paymentType", "MEMBER")} type='submit' className="w-full h-11 text-white font-medium">Proceed to Payment</button>
                </div>
              </div>
            </div>

            <div className="text-center mt-10 pt-12 pb-12">
              <button className="px-12 py-3 rounded-[14px] text-white text-[16px] font-medium" style={{ backgroundColor: '#FF4C7D' }}>Sign Up</button>
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
  );
};

export default JoinISIPage;


