import { AdImage } from "@prisma/client";

export type MediaFilter = {
  adId?: string;
  page?: number;
  limit?: number;
};

export type MediaUpdateData = {
  altText?: string;
  order?: number;
  isMain?: boolean;
};

export type PaginatedMedia = {
  data: AdImage[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function getMedia(filter?: MediaFilter): Promise<PaginatedMedia> {
  const queryParams = new URLSearchParams();

  if (filter?.adId) {
    queryParams.append("adId", filter.adId);
  }

  if (filter?.page) {
    queryParams.append("page", filter.page.toString());
  }

  if (filter?.limit) {
    queryParams.append("limit", filter.limit.toString());
  }

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";

  const response = await fetch(`/api/media${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch media");
  }

  return await response.json();
}

export async function getMediaById(id: string): Promise<AdImage> {
  const response = await fetch(`/api/media/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch media");
  }

  return await response.json();
}

export async function createMedia(
  adId: string,
  url: string,
  isMain?: boolean
): Promise<AdImage> {
  const response = await fetch("/api/media", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adId,
      url,
      isMain,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create media");
  }

  return await response.json();
}

export async function updateMedia(
  id: string,
  data: MediaUpdateData
): Promise<AdImage> {
  const response = await fetch(`/api/media/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update media");
  }

  return await response.json();
}

export async function deleteMedia(id: string): Promise<void> {
  const response = await fetch(`/api/media/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete media");
  }
}
