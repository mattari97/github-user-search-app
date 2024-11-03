<script setup lang="ts">
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useGlobalStore } from '@/stores/global';
import fetchApi, { GITHUB_API_DEFAULT_VALUES } from '@/utils/fetchGitHubApi';
import { getLocalStorageData } from '@/utils/storage';
import LocationIcon from '@/components/icons/LocationIcon.vue';
import WebsiteIcon from '@/components/icons/WebsiteIcon.vue';
import CompanyIcon from '@/components/icons/CompanyIcon.vue';
import TwitterIcon from '@/components/icons/TwitterIcon.vue';
import copyToClipboard from '@/utils/clipboard';

const store = useGlobalStore();

const copyTwitterUsername = async (username: string) => {
  if (!store.data.twitter_username) {
    return;
  }

  try {
    const result = await copyToClipboard(username);
    toast.success(result);
  } catch (error) {
    toast.error(error);
  }
};

onMounted(async () => {
  const username = getLocalStorageData('username', 'octocat');
  const { data, error } = await fetchApi(username);

  if (error) {
    toast.error(error);
    store.setLoading(false);
    return;
  }

  if (data) {
    store.setData(data);
    return;
  }

  /**
   * TODO: Redirect to fallback page
   * because at this point API is broken
   */
});
</script>

<template>
  <section class="profile-container">
    <img
      class="profile-avatar grow-center"
      :src="store.data.avatar_url"
      :alt="`Avatar of ${store.data.login}`"
    />
    <div class="profile-header fade-in" style="--fi-queue: 0">
      <h2 class="profile-header__name">{{ store.data.name }}</h2>
      <a
        class="profile-header__login"
        :href="store.data.html_url"
        target="_blank"
      >
        @{{ store.data.login }}
      </a>
      <span class="profile-header__date"
        >Joined {{ store.data.created_at }}</span
      >
    </div>
    <p class="profile-bio fade-in" style="--fi-queue: 1">
      {{ store.data.bio || GITHUB_API_DEFAULT_VALUES.bio }}
    </p>
    <div class="profile-stats fade-in" style="--fi-queue: 2">
      <div class="profile-stats__group">
        <span>Repos</span>
        <span>{{ store.data.public_repos }}</span>
      </div>
      <div class="profile-stats__group">
        <span>Followers</span>
        <span>{{ store.data.followers }}</span>
      </div>
      <div class="profile-stats__group">
        <span>Following</span>
        <span>{{ store.data.following }}</span>
      </div>
    </div>
    <div class="profile-meta fade-in" style="--fi-queue: 3">
      <span
        class="profile-meta__location"
        :data-available="!!store.data.location"
      >
        <LocationIcon class="profile-meta__icon" />
        {{ store.data.location || GITHUB_API_DEFAULT_VALUES.links }}
      </span>
      <a
        class="profile-meta__blog"
        :href="store.data.blog || undefined"
        :data-available="!!store.data.blog"
      >
        <WebsiteIcon class="profile-meta__icon" />
        {{ store.data.blog || GITHUB_API_DEFAULT_VALUES.links }}
      </a>
      <button
        class="profile-meta__twitter"
        @click="copyTwitterUsername(store.data.twitter_username)"
        :data-available="!!store.data.twitter_username"
        :aria-disabled="!store.data.twitter_username"
        :tabindex="!store.data.twitter_username ? -1 : 0"
      >
        <TwitterIcon class="profile-meta__icon" />
        {{ store.data.twitter_username || GITHUB_API_DEFAULT_VALUES.links }}
      </button>
      <span
        class="profile-meta__company"
        :data-available="!!store.data.company"
      >
        <CompanyIcon class="profile-meta__icon" />
        {{ store.data.company || GITHUB_API_DEFAULT_VALUES.links }}
      </span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.profile-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'avatar  header'
    'bio     bio'
    'stats   stats'
    'meta    meta';
  gap: 2rem 1.5rem;
  margin-block-start: 1rem;
  padding: 2rem 1.5rem;
  background-color: var(--clr-surface);
  box-shadow: var(--box-shadow);
  border-radius: 1rem;

  @media (min-width: 39rem) {
    padding: 2rem;
    gap: 2rem;
  }

  @media (min-width: 68rem) {
    grid-template-areas:
      'avatar  header'
      'avatar  bio'
      '.       stats'
      '.       meta';
  }
}

.profile-avatar {
  grid-area: avatar;
  width: 70px;
  border-radius: 50%;

  @media (min-width: 39rem) {
    width: 117px;
  }
}

.profile-header {
  grid-area: header;
  display: grid;
  grid-auto-rows: min-content;

  &__name {
    font-size: var(--fs-base);
    font-weight: var(--fw-bold);
    color: var(--clr-text-200);
  }

  &__login {
    font-size: var(--fs-sm);
    color: hsl(var(--clr-primary));
  }

  &__date {
    font-size: var(--fs-sm);
  }

  @media (min-width: 39rem) {
    row-gap: 0.5rem;
    align-content: center;

    &__name {
      font-size: var(--fs-xl);
    }

    &__login,
    &__date {
      font-size: var(--fs-base);
    }
  }

  @media (min-width: 68rem) {
    grid-template-columns: 1fr auto;
    grid-auto-flow: dense;
    align-content: normal;
    align-items: center;

    &__name,
    &__data {
      grid-column: span 1;
    }

    &__login {
      grid-column: span 2;
    }
  }
}

.profile-bio {
  grid-area: bio;
  font-size: var(--fs-sm);

  @media (min-width: 39rem) {
    font-size: var(--fs-base);
  }
}

.profile-stats {
  grid-area: stats;
  display: flex;
  justify-content: space-evenly;
  column-gap: 1rem;
  padding: 1rem;
  background-color: var(--clr-background);
  border-radius: 0.5rem;

  &__group {
    display: grid;
    justify-items: center;
    row-gap: 0.5rem;

    & > span:first-of-type {
      font-size: var(--fs-xs);
    }

    & > span:last-of-type {
      font-size: var(--fs-base);
      font-weight: var(--fw-bold);
      color: var(--clr-text-200);
    }
  }

  @media (min-width: 39rem) {
    padding: 1rem 2rem;

    &__group {
      flex: 1;
      justify-items: start;

      & > span:first-of-type {
        font-size: var(--fs-sm);
      }

      & > span:last-of-type {
        font-size: var(--fs-lg);
      }
    }
  }
}

.profile-meta {
  --meta-icon-size: 20px;
  grid-area: meta;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
  grid-auto-rows: min-content;
  justify-items: start;
  gap: 1rem 2rem;
  font-size: var(--fs-sm);

  &__location,
  &__blog,
  &__twitter,
  &__company {
    display: grid;
    grid-template-columns: var(--meta-icon-size) 1fr;
    column-gap: 1rem;
    align-items: center;

    &[data-available='false'] {
      opacity: 0.5;
    }
  }

  &__blog[data-available='false']:hover {
    text-decoration: none;
  }

  &__twitter {
    cursor: pointer;

    &[aria-disabled='true'] {
      cursor: auto;
    }
  }

  &__icon {
    max-width: var(--meta-icon-size);
    max-height: var(--meta-icon-size);
  }

  @media (min-width: 39rem) {
    font-size: var(--fs-base);
  }
}
</style>
