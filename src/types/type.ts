/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

// types.ts
export type UserPayloadType = {
    name: string,
    email: string,
    password: string,
    confirmPass: string
};


// components/input // form
export type InputForm = {
    type?: string;
    label?: string;
    placeholder: string;
    name: string;
    value?: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    error?: Record<string, string>;
}

export interface User {
    id: string;
    username: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
    country: string | null;
    referral_code: string;
    referred_by: string | null;
    account_status: 'active' | 'inactive';
    created_at: string;
    id_plan: string | null;
    referrals: Record<string, any>; // puedes tiparlo mejor si sabes la forma exacta
    phone_number: string | null;
    referrer_id: string | null;
    active_plan: any; // cambia a tipo concreto si sabes la estructura
    rol: 'User' | 'Admin' | string;
    token: string;
}

export interface Plan {
    // define aquí la estructura del plan si existe
    [key: string]: any;
}

export type PlanItem = {
    id?: string;
    user_id: string;
    name: string;
    description?: string;
    price: number;
    currency?: string;
    is_active: boolean;
    create_at?: string;
    updated_at?: string;
    plan_time_end: string;
}

export interface Commission {
    id: string;
    from_user_id: string;
    level: number;
    plan_id: string;
    amount: number;
    created_at: string;
    to_user_id: string;
}

export interface Activities {
    id: string;
    user_id: string;
    related_user_id: string;
    type: string;
    description: string;
    created_at: string;
}

export interface Payment_requests {
    id: string;
    user_id: string;
    amount: number;
    wallet_address: string;
    original_amount: number;
    fee: number;
    status: string;
    created_at: string;
    to_user_id: string;
}

export interface UserStore {
    user: User;
    plan: PlanItem[];
    commissions: Commission[];
    payment_requests: Payment_requests[];
}

// Auth login interface
export interface LoginPayload {
    email: string;
    password: string;
    confirmPass?: string;
    name?: string;
}

export interface loginResponse {
    success: boolean;
    data: { user: User, plan: Plan, commissions: Commission };
    message: string;
}
