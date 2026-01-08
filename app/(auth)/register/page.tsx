"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Reusing similar structure to login for now
export default function RegisterPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Login instead</Link>
            </div>
            <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/80">
                <CardHeader>
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>Enter your details below to create your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First name</label>
                            <Input placeholder="Max" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last name</label>
                            <Input placeholder="Robinson" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="m@example.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input type="password" />
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Create account</Button>
                </CardContent>
            </Card>
        </div>
    );
}
