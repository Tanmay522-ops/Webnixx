"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useWebinarStore } from "@/store/useWebinarStore";
import { CtaTypeEnum } from "@prisma/client";
import { Loader2, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import Stripe from "stripe";
import { createProductInStripe } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
    stripeProducts: Stripe.Product[] | []
}

const CTAStep = ({ stripeProducts }: Props) => {
    const {
        formData,
        updateCTAField,
        addTag,
        removeTag,
        getStepValidationErrors,
    } = useWebinarStore();

    const { ctaLabel, tags, aiAgent, priceId, ctaType } = formData.cta;
    const [tagInput, setTagInput] = useState("")
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [creating, setCreating] = useState(false)
    const errors = getStepValidationErrors("cta")

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        updateCTAField(name as keyof typeof formData.cta, value)
    }

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            addTag(tagInput.trim())
            setTagInput('')
        }
    }

    const handleSelectCTAType = (value: string) => {
        updateCTAField('ctaType', value as CtaTypeEnum)
    }

    const handleProductChange = (value: string) => {
        updateCTAField('priceId', value)
    }

    const handleCreateProduct = async () => {
        if (!productName || !productPrice) {
            toast.error('Please enter product name and price')
            return
        }
        setCreating(true)
        try {
            const res = await createProductInStripe(productName, Number(productPrice))
            if (res.success) {
                toast.success('Product created successfully!')
                setShowCreateForm(false)
                setProductName('')
                setProductPrice('')
                router.refresh()  // ✅ refetches from Stripe without closing dialog
            } else {
                toast.error(res.error || 'Failed to create product')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setCreating(false)
        }
    }
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label
                    htmlFor="ctaLabel"
                    className={errors.ctaLabel ? "text-red-400" : ""}
                >
                    CTA Label <span className="text-red-400">*</span>
                </Label>

                <Input
                    id="ctaLabel"
                    name="ctaLabel"
                    value={ctaLabel || ""}
                    onChange={handleChange}
                    placeholder="Let's Get Started"
                    className={cn(
                        "bg-background/50 border border-input",
                        errors.ctaLabel && "border-red-400 focus-visible:ring-red-400"
                    )}
                />

                {errors.ctaLabel && (
                    <p className="text-sm text-red-400">{errors.ctaLabel}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags and press Enter"
                    className="bg-background/50 border border-input"
                />
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag: string, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-md"
                            >
                                {tag}
                                <button
                                    onClick={() => removeTag(tag)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-2 w-full">
                <Label>CTA Type</Label>
                <Tabs defaultValue={CtaTypeEnum.BOOK_A_CALL} className="w-full">
                    <TabsList className="w-full bg-transparent">
                        <TabsTrigger
                            value={CtaTypeEnum.BOOK_A_CALL}
                            className="w-1/2 data-[state=active]:!bg-background/50"
                            onClick={() => handleSelectCTAType(CtaTypeEnum.BOOK_A_CALL)}
                        >
                            Book a Call
                        </TabsTrigger>
                        <TabsTrigger
                            value={CtaTypeEnum.BUY_NOW}
                            className="w-1/2"
                            onClick={() => handleSelectCTAType(CtaTypeEnum.BUY_NOW)}
                        >
                            Buy Now
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="space-y-2">
                {/* Label + Create button */}
                <div className="flex items-center justify-between">
                    <Label>Attach a Product</Label>
                    <button
                        type="button"
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="text-xs text-blue-400 flex items-center gap-1 hover:text-blue-300"
                    >
                        <Plus className="h-3 w-3" />
                        {showCreateForm ? 'Cancel' : 'Create new product'}
                    </button>
                </div>

                {/* Create Product Form */}
                {showCreateForm && (
                    <div className="p-3 border border-input rounded-md space-y-2 bg-background/50">
                        <Input
                            placeholder="Product name (e.g. spotlight course)"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="bg-background/50 border border-input"
                        />
                        <Input
                            placeholder="Price in USD (e.g. 99)"
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="bg-background/50 border border-input"
                        />
                        <Button
                            type="button"
                            size="sm"
                            onClick={handleCreateProduct}
                            disabled={creating || !productName || !productPrice}
                            className="w-full"
                        >
                            {creating ? (
                                <><Loader2 className="mr-2 h-3 w-3 animate-spin" />Creating...</>
                            ) : 'Create Product'}
                        </Button>
                    </div>
                )}

                {/* Product Selector */}
                <div className="relative">
                    <div className="mb-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search products"
                                className="pl-9 !bg-background/50 border border-input"
                            />
                        </div>
                    </div>

                    <Select value={priceId} onValueChange={handleProductChange}>
                        <SelectTrigger className="w-full !bg-background/50 border border-input">
                            <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-input max-h-48">
                            {stripeProducts?.length > 0 ? (
                                stripeProducts.map((product) => (
                                    <SelectItem
                                        key={product.id}
                                        value={
                                            typeof product.default_price === 'string'
                                                ? product.default_price
                                                : (product.default_price as any)?.id || ''
                                        }
                                        className="!bg-background/50 hover:!bg-white/10"
                                    >
                                        {product.name}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="none" disabled>
                                    No products — create one above ↑
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
};

export default CTAStep;