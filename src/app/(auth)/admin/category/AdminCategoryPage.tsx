"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Tag,
  Check,
  X,
} from "lucide-react";

// Types
interface Category {
  id: string;
  name: string;
}

// Mock data
const mockCategories: Category[] = [
  {
    id: "QWW",
    name: "STARTER",
  },
  {
    id: "CVGXF",
    name: "DRINKS",
  },
  {
    id: "ERTY",
    name: "MAIN DISHES",
  },
  {
    id: "UUII",
    name: "DESSERTS",
  },
];

export default function AdminCategoriesPage({data}: {data: Category[]}) {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "" });

  // Filter categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate random ID (replace with your actual ID generation)
  const generateId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Handle create category
  const handleCreate = () => {
    if (formData.name.trim()) {
      const newCategory: Category = {
        id: generateId(),
        name: formData.name.trim().toUpperCase(),
      };
      setCategories([...categories, newCategory]);
      setFormData({ name: "" });
      setIsCreateDialogOpen(false);
    }
  };

  // Handle edit category
  const handleEdit = () => {
    if (selectedCategory && formData.name.trim()) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory.id
            ? { ...cat, name: formData.name.trim().toUpperCase() }
            : cat
        )
      );
      setFormData({ name: "" });
      setSelectedCategory(null);
      setIsEditDialogOpen(false);
    }
  };

  // Handle delete category
  const handleDelete = () => {
    if (selectedCategory) {
      setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
      setSelectedCategory(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Open edit dialog
  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Category Management
          </h1>
          <p className="text-slate-600">
            Manage food categories for your menu
          </p>
        </div>

        {/* Statistics Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Tag className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Categories
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {categories.length}
                  </p>
                </div>
              </div>

              {/* Create Button */}
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>
                      Add a new category for your menu items.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-name">Category Name</Label>
                      <Input
                        id="category-name"
                        placeholder="e.g., APPETIZERS"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ name: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleCreate();
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFormData({ name: "" });
                        setIsCreateDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={!formData.name.trim()}>
                      <Check className="h-4 w-4 mr-2" />
                      Create
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Tag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">
                {searchQuery ? "No categories found" : "No categories yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCategories.map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Tag className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <p className="text-xs text-slate-500 mt-1">
                          ID: {category.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openEditDialog(category)}
                    >
                      <Edit className="h-3 w-3 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => openDeleteDialog(category)}
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update the category name.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category-name">Category Name</Label>
                <Input
                  id="edit-category-name"
                  placeholder="e.g., APPETIZERS"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ name: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEdit();
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setFormData({ name: "" });
                  setSelectedCategory(null);
                  setIsEditDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleEdit} disabled={!formData.name.trim()}>
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the category "{selectedCategory?.name}".
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedCategory(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
